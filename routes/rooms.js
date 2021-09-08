const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads'});

router.post(
    '/',
    roomController.createRoom
);

router.get(
    '/',
    roomController.getRooms
);

router.get(
    '/:branch',
    roomController.getRoomsBranch
)

router.get(
    '/get-image/:image',
    roomController.getImageFile
);

module.exports = router;