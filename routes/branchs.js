const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

router.post(
    '/',
    branchController.createBranch
);

router.get(
    '/',
    branchController.getBranchs
);

router.get(
    '/:branch',
    branchController.getBranch
)

module.exports = router;