const { Router } = require('express');
const {
    getAllUsers, 
    createUser, 
    updateUser, 
    getUserById, 
    deleteUser
} = require('../controllers/users');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations
} = require('../middlewares/users');


const router = Router();

router.get('/', getAllRequestValidation, getAllUsers);
router.post('/', postRequestValidations, createUser);
router.put('/:id(\\d+)/', putRequestValidations, updateUser);
router.get('/:id(\\d+)/', getRequestValidation, getUserById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteUser);

module.exports = router;