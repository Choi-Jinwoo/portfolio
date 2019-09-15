const showEvent = () => {
	const queryString = getUrlParams();
	const event_id = queryString.event_id;

	const title = document.getElementById("title");
	const start_date = document.getElementById("start_date");
	const end_date = document.getElementById("end_date");
	const content = document.getElementById("content");	
	const files = document.getElementById("files");

	$.ajax({
		type:"GET",
		url:`http://localhost:3000/event?event_id=${event_id}`,
		beforeSend : function(xhr){
			xhr.setRequestHeader("token", localStorage.token);
		},
		dataType : "json",
		success: (data, status) => {
			title.innerText = data.data.event.title;
			start_date.innerText = data.data.event.start_date;
			end_date.innerText = data.data.event.end_date;
			content.innerText = data.data.event.content;
			
			if (!data.data.event.files.length) {
				files.innerText = "파일이 없습니다."
			} else {
				for (let i = 0; i < data.data.event.files.length; i++) {
					const file_name = data.data.event.files[i].file_name.split("_");
					file_name[0] = null;
					file_name[1] = null;
					file = file_name.join("");
					//files.innerHTML = files.innerHTML + `<br><div onclick="fileDown(${data.data.event.files[i].id});">${file}</div>`;
					files.innerHTML = files.innerHTML + `<br><a href="http://localhost:3000/file/download?file_id=${data.data.event.files[i].id}">${file}</div>`;

				}
			}
			
		},
		error: (xhr, status, error) => {
			if (error === 'Bad Request') {
				alert('옳지 않은 주소입니다. 다시 시도 해주세요.');
			} else {
				alert('오류가 발생하였습니다.');
			}
		}  
	});
}

function fileDown(file) {
	// $.ajax({
	// 	type:"GET",
	// 	url:`http://localhost:3000/file/download?file_id=${file}`,
	// 	beforeSend : function(xhr){
	// 		xhr.setRequestHeader("token", localStorage.token);
	// 	},
	// 	dataType : "json",
	// 	success: (data, status) => {
	// 	},
	// 	error: (xhr, status, error) => {
	// 		console.log(error);
	// 		alert("파일 다운로드에 실패하였습니다.");
	// 	}  
	// });
}

function getUrlParams() {
	var params = {};
	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	return params;
}

