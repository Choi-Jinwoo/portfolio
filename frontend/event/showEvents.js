const showEvents = () => {
	$.ajax({
		type : "GET",
		url : `http://localhost:3000/event`,
		beforeSend : function(xhr){
			xhr.setRequestHeader("token", localStorage.token);
		},
		dataType : "json",
		success: (data, status) => {
			const eventsLength = data.data.events.length;

			for (let i = 0; i < eventsLength; i++) {
				const title = data.data.events[i].title;
				const start_date = data.data.events[i].start_date;
				const end_date = data.data.events[i].end_date;
				const tag = `<div><div class="event" id="event${i}"><div class="data_title">${title}</div><div>${start_date} ~ ${end_date}</div></div>`
				$("body").append(tag);
				
			 	$(document).on("click",`#event${i}`,function(){ 
					location.href=`http://127.0.0.1:5500/event/showEvent.html?event_id=${data.data.events[i].id}`;
				});
			}
		},
		error : (xhr, status, error) => {
			console.log(error);
			if (error === 'Bad Request') {
				const tag = `<div class="no_data">포트폴리오를 작성하세요!</div>`
				$("body").append(tag);
			} else {
				alert("데이터 조회중 오류가 발생하였습니다.");
				localStorage.token = null;
				location.href="http://127.0.0.1:5500/login/login.html";
			}
		}
	})
}
