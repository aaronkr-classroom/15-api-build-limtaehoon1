// public/js/modal.js
"use strict";

/**
 * Listing 26.6 (p. 388)
 * @TODO: modal.js에서 모달에 데이터 로딩을 위한 Ajax 함수
 */
$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/courses?format=json", (data) => {
      data.forEach((course) => {
        $(".modal-body").append(
          `<div>
            <span class="course-title">${course.title}</span>
            <div class="course-description">${course.description}</div>
            <button class="btn btn-info course-button" data-id="${course._id}">View</button>
          </div>`
        );
      });
    });
  });
});

/**
 * Listing 27.3 (p. 394)
 * @TODO: joinFunctions.js에서 Ajax 호출의 수정
 */
$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");

    $.get("/api/courses", (result = {}) => {
      let data = result.data;

      if (!data || !data.courses) return;

      console.log(data.courses);

      data.courses.forEach((course) => {
        console.log(course);
        
        
        $(".modal-body").append(
          `<div>
            <h5 class="course-title">${course.title}</h5>
            <p class="course-description">${course.description}</p>
            <button class="btn btn-info course-button
              ${course.joined ? "joined-button" : "join-button"}
            " data-id="${course._id}">
              ${course.joined ? "Joined" : "Join"}
            </button>
          </div>`
        );
      });
    }) .then(() => {
      addJoinButtonListener();
    });

    $("#myModal").modal("show");
  });
  $(".dismiss-modal").click(()=>{
    $("#myModal").modal("hide");
  });

});
/**
 * Listing 27.5 (p. 397-398)
 * @TODO: joinFunctions.js에서 각 버튼에 이벤트 리스너 추가
 */
// 모달 버튼을 위한 이벤트 리스너 생성
let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId =$button.data("id");

    $.get(`/api/courses/${courseId}/join`, (result = {}) => {
      let data = result.data;


      console.log("Joining Course",courseId);
      console.log(result.data);

      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button")
      } else {
        $button.after (
          `<em style= "color: red; margin-left: 10px; padding-top: 2px;">${result.message}</em>`
        );
      }

    })
  })
}