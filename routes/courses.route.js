import express, {json} from 'express';
import coursesService from "../services/courses.service.js";
import topicService from "../services/topic.service.js";
import categoryService from "../services/category.service.js";
import accountService from "../services/account.service.js";
import videoService from "../services/video.service.js";
import watchListService from "../services/watch-list.service.js";
import shoppingService from "../services/shopping.service.js";

const router = express.Router();

router.get('/detail', async function(req, res) {
    const id = req.query.id;
	const v = req.query.v;
    const course = await coursesService.findById(id);

    const lecture = await accountService.findById(course.lecture_id);
    const videos = await videoService.findByCourseId(id);

    course.lecture_name = lecture.firstname + lecture.lastname;
    course.lecture_email = lecture.email;

    course.video = v;

	let content = [];

	for (let video of videos) {
		content.push({
			id: id,
			video: video
		})
	}

	course.content = content;
	// course.introduction = videos[0];
	// const [, ...content] = videos;

	// course.content = content;


    res.render('vwCourse/detail', {
        course
    });
})

router.get('/byCat/:id', async function(req, res) {
    req.session.retUrl = req.originalUrl;
    const CatId = req.params.id;

    const page = req.query.page || 1;
    const limit = 3;
    const offset = (page - 1) * limit;

    let total = await coursesService.countByCatId(CatId);
    let courses = await coursesService.findPageByCat(CatId, offset, limit);

    let nPages = Math.floor(total / limit);

    if (total % limit > 0) nPages++;

    let pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        })
    }

    let previous = null;
    let next = null;

    if (+page > 1) {
        previous = {
            value: +page - 1,
        };
    }

    if (+page < nPages) {
        next = {
            value: +page + 1,
        };
    }

    const category = await categoryService.findById(CatId);
    let catName = category.name;

    if (courses === null) {
        res.render('vwCourse/list', {
            empty: true,
            catName,
            warning: `Can not find any courses of "${catName}"`,
            layout: 'main-tagbar'
        });
        return;
    }

    for (let course of courses) {
        let lecture = await accountService.findById(course.lecture_id);
        course.lecture_name = lecture.firstname + lecture.lastname;
    }

    for (let i = 0; i < courses.length; i++) {
        let ratings = ['','','','',''];
        for (let j = 0; j < courses[i].rating; j++) {
            ratings[j] = `rating-color rat-c${courses[i].id}`;
        }
        courses[i].ratings = ratings;
    }

    res.render('vwCourse/list', {
        courses,
        total,
        key: catName,
        pageNumbers,
        previous,
        next,
        topicName: courses.topicName,
        layout: 'main-tagbar'
    });
})
router.get('/byTopic/:id', async function(req, res) {
    req.session.retUrl = req.originalUrl;
    const TopicId = req.params.id;
    const page = req.query.page || 1;
    const limit = 3;
    const offset = (page - 1) * limit;

    let total = await coursesService.countByTopicId(TopicId);
    let courses = await coursesService.findPageByTopic(TopicId, offset, limit);

    let nPages = Math.floor(total / limit);

    if (total % limit > 0) nPages++;

    let pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        })
    }

    let previous = null;
    let next = null;

    if (+page > 1) {
        previous = {
            value: +page - 1,
        };
    }

    if (+page < nPages) {
        next = {
            value: +page + 1,
        };
    }

    const topic = await topicService.findById(TopicId);
    const topicName = topic.topicName;

    if (courses === null) {
        res.render('vwCourse/list', {
            empty: true,
            topicName,
            warning: `Can not find any courses of "${topicName}"`,
            layout: 'main-tagbar'
        });
        return;
    }

    for (let course of courses) {
        let lecture = await accountService.findById(course.lecture_id);
        course.lecture_name = lecture.firstname + lecture.lastname;
    }

    for (let i = 0; i < courses.length; i++) {
        let ratings = ['','','','',''];
        for (let j = 0; j < courses[i].rating; j++) {
            ratings[j] = `rating-color rat-c${courses[i].id}`;
        }
        courses[i].ratings = ratings;
    }


    res.render('vwCourse/list', {
        courses,
        total,
        key: topicName,
        pageNumbers,
        previous,
        next,
        topicName,
        layout: 'main-tagbar'
    });
})

router.get('/search', async function(req, res) {
    req.session.retUrl = req.originalUrl;
    const key = req.query.key || '';
    const page = req.query.page || 1;
    const ratings = req.query.ratings;

    const limit = 3;
    const offset = (page - 1) * limit;

    let courses = await coursesService.findPageBySearch(key, offset, limit);
    let total = await coursesService.countBySearch(key);

    if (courses == null) {
        res.render('vwCourse/list', {
            empty: true,
            warning: `Can not find any courses of "${key}"`,
            layout: 'main-tagbar'
        });
        return;
    }

    let nPages = Math.floor(total / limit);

    if (total % limit > 0) nPages++;

    let pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            key: key,
            isCurrent: +page === i
        })
    }

    let previous = null;
    let next = null;

    if (+page > 1) {
        previous = {
            key: key,
            value: +page - 1,
        };
    }

    if (+page < nPages) {
        next = {
            key: key,
            value: +page + 1,
        };
    }

    for (let course of courses) {
        let lecture = await accountService.findById(course.lecture_id);
        course.lecture_name = lecture.firstname + lecture.lastname;
    }

    for (let i = 0; i < courses.length; i++) {
        let ratings = ['','','','',''];
        for (let j = 0; j < courses[i].rating; j++) {
            ratings[j] = `rating-color rat-c${courses[i].id}`;
        }
        courses[i].ratings = ratings;
    }


    res.render('vwCourse/list', {
        courses,
        total,
        key,
        pageNumbers,
        previous,
        next,
        topicName: courses.topicName,
        layout: 'main-tagbar'
    });
})

router.get('/click-heart', async function(req, res) {
    const user = res.locals.authUser;

    if (typeof user === 'undefined') {

        return res.json(false);
    }
    const id = req.query.id;
    if (await watchListService.isExist(user.id, id)) {
        await watchListService.delete(user.id, id);
        return res.json('changed');
    }

    const entity = {
        user_id: user.id+'',
        course_id: id
    }

    await watchListService.add(entity);
    return res.json('changed');
})

router.get('/click-enroll', async function(req, res) {
    const user = res.locals.authUser;

    if (typeof user === 'undefined') {
        return res.json(false);

    }
    const id = req.query.id;
    if (await shoppingService.isExist(user.id, id)) {
        await shoppingService.delete(user.id, id);
        return res.json('changed');
    }

    const entity = {
        user_id: user.id+'',
        course_id: id
    }

    await shoppingService.add(entity);
    return res.json('changed');
})

export default router;
