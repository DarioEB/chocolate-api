const Category = require('../models/Category');

exports.createCategory = async (req, res, next) => {
    
    const { name } = req.body;
    try {
        let category = await Category.findOne({name});
    
        if(category) {
            return res.status(400).json({msg: 'La Categoría ya existe'});
        }
    
        category = new Category(req.body);
        await category.save();
        res.json({msg: 'Categoría creada correctamente'});
    } catch (error) {
        console.log(error);
    }
}

exports.getCategories = async (req, res) => {

    try {
        const categories = await Category.find();
        res.json({categories});
    } catch (error) {
        console.log(error);
    }
}

exports.getCategory = async (req, res) => {
    try {
        const id = req.params.id;
        let category = await Category.findById({_id: req.params.id});
        if(!category) {
            res.status(400).json({msg: 'Categoría no encontrada'});
        }
        res.json({category});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}