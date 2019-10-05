const showEvent = async () => {
  const queryString = getUrlParams();
  const event_id = queryString.event_id;

  const title = document.getElementById("title");
  const start_date = document.getElementById("start_date");
  const end_date = document.getElementById("end_date");
  const content = document.getElementById("content");
  const files = document.getElementById("files");
  let _event_id;

  await $.ajax({
    type: "GET",
    url: `http://localhost:3000/event?event_id=${event_id}`,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("token", localStorage.token);
    },
    dataType: "json",
    success: (data, status) => {
      title.innerText = data.data.event.title;
      start_date.innerText = data.data.event.start_date;
      end_date.innerText = data.data.event.end_date;
      content.innerText = data.data.event.content;

      if (!data.data.event.files.length) {
        files.innerText = "파일이 없습니다.";
      } else {
        for (let i = 0; i < data.data.event.files.length; i++) {
          const file_name = data.data.event.files[i].file_name.split("_");
          file_name[0] = null;
          file_name[1] = null;
          file = file_name.join("");
          files.innerHTML =
            files.innerHTML +
            `<br><a href="http://localhost:3000/file/download?file_id=${data.data.event.files[i].id}">${file}</div>`;
        }
      }

      _event_id = data.data.event.id;
    },
    error: (xhr, status, error) => {
      if (error === "Bad Request") {
        alert("옳지 않은 주소입니다. 다시 시도 해주세요.");
      } else {
        alert("오류가 발생하였습니다.");
      }
      location.href = "http://127.0.0.1:5500/frontend/event/showEvents.html";
    }
  });

  return _event_id;
};

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    str,
    key,
    value
  ) {
    params[key] = value;
  });
  return params;
}

const deleteEvent = id => {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:3000/event?event_id=${id}`,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("token", localStorage.token);
    },
    dataType: "json",
    success: (data, status) => {
      alert("삭제 완료!");
      location.href = "http://127.0.0.1:5500/frontend/event/showEvents.html";
    },
    error: (xhr, status, error) => {
      console.log(error);
      alert("삭제중 오류가 발생하였습니다.");
      localStorage.token = null;
      location.href = "http://127.0.0.1:5500/frontend/login/login.html";
    }
  });
};
