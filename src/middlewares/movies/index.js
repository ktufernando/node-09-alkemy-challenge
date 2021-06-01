const { check } = require('express-validator');
const multer = require('multer');
const upload = multer();
const AppError = require('../../errors/appError');
const movieService = require('../../services/movieService');
const characterService = require('../../services/characterService');
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../../constants');
const logger = require('../../loaders/logger');
const { validationResult, imageRequired } = require('../commons');
const { validJWT, hasRole } = require('../auth');
const GenderTypeRepository = require('../../repositories/genderTypeRepository');
const ContentTypeRepository = require('../../repositories/contentTypeRepository');
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();


//const _idRequied = check('id').not().isEmpty();
//const _idIsNumeric = check('id').isNumeric();
const _idExist = check('id').custom(
    async (id = '') => {
        const cFound = await movieService.findById(id);
        if (!cFound) {
            throw new AppError('The id does not exist in DB', 400);
        }
    }
);

const _creationDateIsDateAndOptional = check('creationDate').optional().isDate();
const _creationDateRequired = check('creationDate').not().isEmpty();
const _creationDateIsDate = check('creationDate').isDate();

const _titleOptional = check('title').optional();
const _titleRequired = check('title', 'Title required').not().isEmpty();
const _titleNotExist = check('title').custom(
    async (title = '') => {
        const mFound = await movieService.findByTitle(title);
        if (mFound) {
            throw new AppError('The title exist in DB', 400);
        }
    }
);

const _calificationIsNumericAndOptional = check('calification').optional().isNumeric();
const _calificationRequired = check('calification').not().isEmpty();
const _calificationIsNumeric = check('calification').isNumeric();


const _contentTypeExistValidation = async (contentType = '') => {
    const contentTypeFound = await contentTypeRepository.findByDescription(contentType);
    if (!contentTypeFound) {
        throw new AppError('The content type does not exist in DB', 400);
    }
}

const _genderTypeExistValidation = async (genderType = '') => {
    const genderTypeFound = await genderTypeRepository.findByDescription(genderType);
    if (!genderTypeFound) {
        throw new AppError('The gender type does not exist in DB', 400);
    }
}

const _contentTypeExist = check('contentType').custom(_contentTypeExistValidation);
const _genderTypeExist = check('genderType').custom(_genderTypeExistValidation);
const _contentTypeExistAndOptional = check('contentType').optional().custom(_contentTypeExistValidation);
const _genderTypeExistAndOptional = check('genderType').optional().custom(_genderTypeExistValidation);


const _idRequired = (name) => {
    return check(name).not().isEmpty();
}
const _idIsNumeric = (name) => {
    return check(name).isNumeric();
}
const _idCharacterExist = check('idCharacter').custom(
    async (idCharacter = '', {req}) => {
        const cFound = await characterService.findById(idCharacter);
        if(!cFound) {
            throw new AppError('The character id does not exist in DB', 400);
        }
        req.character = cFound;
    }
);


const _idMovieExist = check('idMovie').custom(
    async (idMovie = '', {req}) => {
        const mFound = await movieService.findById(idMovie);
        if (!mFound) {
            throw new AppError('The movie id does not exist in DB', 400);
        }
        req.movie = mFound;
    }
);

const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _titleRequired,
    _titleNotExist,
    _creationDateRequired,
    _creationDateIsDate,
    _calificationRequired,
    _calificationIsNumeric,
    _contentTypeExist,
    _genderTypeExist,
    validationResult
]

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired('id'),
    _idIsNumeric('id'),
    _idExist,
    _titleOptional,
    _titleNotExist,
    _creationDateIsDateAndOptional,
    _calificationIsNumericAndOptional,
    _contentTypeExistAndOptional,
    _genderTypeExistAndOptional,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired('id'),
    _idIsNumeric('id'),
    _idExist,
    validationResult
]

const getAllRequestValidation = [
    validJWT
]

const getRequestValidation = [
    validJWT,
    _idRequired('id'),
    _idIsNumeric('id'),
    _idExist,
    validationResult
]

const postImageRequestValidations = [
    validJWT,
    hasRole(USER_ROLE, ADMIN_ROLE),
    upload.single('image'),
    _idRequired('id'),
    _idIsNumeric('id'),
    _idExist,
    imageRequired,
    validationResult
]

const asociationRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired('idCharacter'),
    _idIsNumeric('idCharacter'),
    _idCharacterExist,
    _idRequired('idMovie'),
    _idIsNumeric('idMovie'),
    _idMovieExist,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageRequestValidations,
    asociationRequestValidations
}