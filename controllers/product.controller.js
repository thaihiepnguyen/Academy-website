import productService from "../services/product.service.js";


export default {
    findByCatId: async (req, res) => {
        const CatId = req.params.id;

        const courses = await productService.findByCatId(CatId);

        res.render('vwProduct/courses', {
            courses
        });
    }
}