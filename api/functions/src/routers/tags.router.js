const express = require('express');
const router = express.Router();

const Auth = require('../config/middleware');
const TagsController = require('../controllers/tags.controller');

router.post('/', Auth, TagsController.Create);
router.get('/', Auth, TagsController.List);
router.get('/:tagId', Auth, TagsController.Retrieve);
router.get('/:tagId/category', Auth, TagsController.ListCategory);
router.put('/:tagId', Auth, TagsController.Update);
router.delete('/:tagId', Auth, TagsController.Delete);

module.exports = router;