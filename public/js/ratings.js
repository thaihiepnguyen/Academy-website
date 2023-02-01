const ratings = $('.rating');

const courses = $('.course');

ratings.on('change', function(e) {
    const rating = parseInt(e.target.id);
    for (let course of courses) {
        let rat = $(`.rat-${course.id}`).length;
        if (rat < rating) {
            course.remove();
        }
    }
})