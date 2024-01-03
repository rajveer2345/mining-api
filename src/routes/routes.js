const express = require('express');
const router = express.Router();
const lease_controller = require('../controller/leaseController');


//user routes
router.post('/lease/add', lease_controller.add);
router.get('/lease/getall', lease_controller.getAll);
router.get('/lease/search', lease_controller.search);


module.exports = router;