const express = require('express');
const router = express.Router();

const Auth = require('../config/middleware');
const CategoryController = require('../controllers/category.controller');

router.post('/', Auth, CategoryController.Create);
// router.get('/', Auth, CategoryController.List);
// router.get('/:categoryId', Auth, CategoryController.Retrieve);
router.get('/:categoryId/transactions', Auth, CategoryController.ListTransaction);
router.put('/:categoryId', Auth, CategoryController.Update);
router.delete('/:categoryId', Auth, CategoryController.Delete);

module.exports = router;