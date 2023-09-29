let hearts = $('.formHeart');

hearts.on('submit', function(e) {
    e.preventDefault();

    const idRaw = this.id; // 'h{{id}}'
    const idCourses = idRaw.match(/\d+/)[0]; // '{{id}}'

    $.getJSON(`/courses/click-heart?id=${idCourses}`, function (data) {
        if (data === 'changed') {
            const heart = $(`#${idRaw} > button`);
            if (heart.hasClass('active')) {
                heart.removeClass('active');
            } else {
                heart.addClass('active');
            }
        }
        if (data === false) {
            window.location.href = "account/login";
        }
    });
})
