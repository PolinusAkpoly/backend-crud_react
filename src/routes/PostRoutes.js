/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : 08/01/2024 17:26:59
 */
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
// const uploadFileConfig = require('../../config/upload.file.config.js');

/*
 * GET 
 */
router.get('/', /*auth.admin,*/ PostController.getPosts);

/*
 * GET 
 */
router.get('/by/page', /*auth.admin,*/ PostController.getPostsByPage);

/*
 * GET 
 */
router.get('/search', /*auth.admin,*/ PostController.searchPostByTag);

/*
 * GET
 */
router.get('/:id', /*auth.admin,*/ PostController.showPostById);

/*
 * POST
 */
router.post('/', /*uploadFileConfig,*/ /*auth.admin,*/ PostController.createPost);
/*
 * POST
 */
router.post('/sort', /*auth.admin,*/ PostController.sortPostByPosition);

/*
 * PUT
 */
router.put('/:id', /*uploadFileConfig,*/ /*auth.admin,*/ PostController.updatePostById);

/*
 * DELETE
 */
router.delete('/:id', /*auth.admin,*/ PostController.removePostById);

module.exports = router;
