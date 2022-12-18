import productService from "../services/product.service.js";


export default {
    findByCatId: async (req, res) => {
        const CatId = req.params.id;

        const courses = await productService.findByCatId(CatId);

        console.log(courses);
        res.render('vwProduct/courses', {
            courses
        });
    }
}