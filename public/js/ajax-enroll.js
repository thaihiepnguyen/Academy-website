let enroll = $('.formEnroll');

enroll.on('submit', function(e) {
    e.preventDefault();

    const idRaw = this.id;
    const idCourses = idRaw.match(/\d+/)[0];

    console.log(idRaw);
    $(document).ready(function () {
        $.getJSON(`/courses/click-enroll?id=${idCourses}`, function (data) {
            if (data === 'changed') {
                const e = $(`#${idRaw} > button`);
                if (e.hasClass('enrolled')) {
                    e.removeClass('enrolled');
                    e.text('Enroll Now');
                } else {
                    e.addClass('enrolled');
                    e.text('Enrolled');
                }
            }
            if (data === false) {
                window.location.href = "account/login";
            }
        });
    });
})
