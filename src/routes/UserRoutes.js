/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : 08/01/2024 16:19:02
 */
const express = require('express');
const auth = require('../helpers/auth');
const router = express.Router();
const UserController = require('../controllers/UserController');

/*
 * GET 
 * Get all Users
 */
// router.get('/load',  UserController.loadUsers);
router.get('/', auth.admin, UserController.getUsers);

/*
 * GET 
 * Get all Users by page
 */
router.get('/by/page', auth.admin, UserController.getUsersByPage);

/*
 * GET 
 * Get one User
 */
router.get('/:id', auth.admin, UserController.showUserById);

/*
 * User  
 * Create one Users
 */
router.post('/', auth.admin, UserController.createUser);

/*
 * User
 * Signin one User
 */
router.post('/signin', UserController.signinUser);

/*
 * User
 * Signup one User
 */
router.post('/signup', UserController.signupUser);

/*
 * User
 * Sort Users data by position
 */
router.post('/sort', auth.auth, UserController.sortUserByPosition);

/*
 * PUT
 * Update one User
 */
router.put('/:id', auth.auth, UserController.updateUserById);

/*
 * DELETE
 * Delete one User
 */
router.delete('/:id', auth.admin, UserController.removeUserById);

module.exports = router;
