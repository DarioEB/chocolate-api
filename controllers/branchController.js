const Branch = require('../models/Branch');

exports.createBranch = async (req, res, next) => {
    
    const { name } = req.body;
    try {
        let branch = await Branch.findOne({name});
    
        if(branch) {
            return res.status(400).json({msg: 'La Sucursal ya existe'});
        }
    
        branch = new Branch(req.body);
        await branch.save();
        res.json({msg: 'Sucursal creada correctamente'});
    } catch (error) {
        console.log(error);
    }
}

exports.getBranchs = async (req, res) => {

    try {
        const branchs = await Branch.find();
        res.json({branchs});
    } catch (error) {
        console.log(error);
    }
}