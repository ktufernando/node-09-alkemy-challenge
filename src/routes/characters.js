const { Router } = require('express');
const multer  = require('multer');
const upload = multer();
const {
    getAllCharacters, 
    createCharacter, 
    updateCharacter, 
    getCharacterById, 
    deleteCharacter,
    uploadCharacterImage
} = require('../controllers/characters');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations
} = require('../middlewares/characters');


const router = Router();

router.get('/', getAllRequestValidation, getAllCharacters);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id(\\d+)/', putRequestValidations, updateCharacter);
router.get('/:id(\\d+)/', getRequestValidation, getCharacterById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteCharacter);
router.post('/image', upload.single('image'), uploadCharacterImage);

module.exports = router;