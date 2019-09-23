const addEvent = () => {
	let title = document.getElementsByName("title");
	let start_date = document.getElementsByName("start_date");
	let end_date = document.getElementsByName("end_date");
	let content = document.getElementsByName("content");
	let files = document.getElementsByName("files");
	
	title = title[0].value;
	start_date = start_date[0].value;
	end_date = end_date[0].value;
	content = content[0].value;
	
	$.ajax({
		type:"POST",
		url:"http://localhost:3000/event",
		beforeSend : function(xhr){
			xhr.setRequestHeader("token", localStorage.token);
		},
		data : { title, start_date, end_date, content },
		dataType : "json",
		success: (data, status) => {
			const form = $('#FILE_FORM')[0];
			const formData = new FormData(form);
			
			$.ajax({
				type : "POST",
				url : `http://localhost:3000/file/upload?event_id=${data.data.event_id}`,
				beforeSend : function(xhr){
					xhr.setRequestHeader("token", localStorage.token);
				},
				processData: false,
				contentType: false,
				data : formData,
				dataType : "json",
				success: (data, status) => {
					alert('저장 완료!');
					location.href="http://127.0.0.1:5500/event/showEvents.html";
				},
				error : (xhr, status, error) => {
					if (error === "Bad Request") {
						alert("양식을 확인해주세요.");
					} else{
						console.log(error);
						alert("파일 업로드에 실패하였습니다.");
					}
				}
			})
		},

		error: (xhr, status, error) => {
			console.log(error);
			if (error === 'Bad Request') {
				alert('양식을 다시 확인해주세요.');
			} else {
				alert('오류가 발생하였습니다.');
				location.href="http://127.0.0.1:5500/login/login.html";
				localStorage.token = null;
			}
		}  
});
}