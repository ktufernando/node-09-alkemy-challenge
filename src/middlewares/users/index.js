const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const userService = require('../../services/userService');
const { ROLES, ADMIN_ROLE } = require('../../constants');
const logger = require('../../loaders/logger');
const {validationResult} = require('../commons');
const { validJWT, hasRole } = require('../auth');

const _nameRequired = check('name', 'Name required').not().isEmpty();
const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is invalid').isEmail();
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
);
const _optionalEmailValid = check('email', 'Email is invalid').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
);
const _passwordRequired = check('password', 'Password required').not().isEmpty();
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new AppError('Ivalid Role', 400);
        }
    }
);

const _idRequied = check('id').not().isEmpty();
const _idIsNumeric = check('id').isNumeric();
const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await userService.findById(id);
        if(!userFound) {
            throw new AppError('The id does not exist in DB', 400);
        }
    }
);

const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _passwordRequired,
    _roleValid,
    validationResult
]

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idIsNumeric,
    _idExist,
    _optionalEmailValid,
    _optionalEmailExist,
    _roleValid,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idIsNumeric,
    _idExist,
    validationResult
]

const getAllRequestValidation = [
    validJWT
]

const getRequestValidation = [
    validJWT,
    _idRequied,
    _idIsNumeric,
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations
}