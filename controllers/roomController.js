const multer = require('multer');
const fs = require('fs');
const path = require('path')
const Room = require('../models/Room');
const Branch = require('../models/Branch');

exports.createRoom = async (req, res, next) => {
    
    const { name } = req.body;
    try {
        const room = new Room(req.body);
        await room.save();
        res.json({msg: 'Habitación creada correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find().populate("category").populate("branch");
        res.json({rooms});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"})
    }
}

exports.getRoomsBranch = async (req, res, next) => {
    const branchRoute = req.params.branch;
    try {
        let branchExist = await Branch.findOne({route: branchRoute});
        if(!branchExist) {
            return res.status(401).json({message: "No se renococe la ruta de la sucursal (branch)"});
        }
        const rooms = await Room.find({branch: branchExist._id}).populate("category").populate("branch");
        res.json({rooms});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});
    }
}

exports.getRoom = async (req, res, next) => {
    const branchRoute = req.params.branch;
    const roomRoute = req.params.room;
    
    try {
        let branchExist = await Branch.findOne({route: branchRoute});
        
        if(!branchExist) {
            return res.status(401).json({message: "No se reconoce la ruta de la sucursal (branch)"});
        }
        
        const room = await Room.findOne({route: roomRoute, branch: branchExist._id}).populate("category").populate("branch");
        // console.log(room);
        if(!room) {
            return res.status(401).json({message: "No se reconoce la ruta de la habitación"});
        }

        res.json({room, message: "Datos de la habitación obtenidos correctamente"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Hubo un error"});

    }
}

exports.getImageFile = async (req, res) => {
    try {
        const file = req.params.image;
        const pathFile = `./uploads/${file}`;
        fs.exists(pathFile, (exists) => {
            if(exists) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(200).send('No existe la imagen');
            }
        });
    } catch (error) {
        console.log(error);
    }
}