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

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json({rooms});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getRoomsBranch = async (req, res) => {
    try {
        const br = req.params.branch;

        let branch = await Branch.find({branch: br});
        if(!branch) {
            res.status(400).json({msg: 'La sucursal enviada no existe'});
        }

        const rooms = await Room.find({branch: br});
        res.json({rooms});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
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