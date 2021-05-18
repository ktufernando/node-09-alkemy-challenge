const express = require('express');
const characterService = require('../services/characterService');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
/*const getAllUsers = async (req, res, next) => {
    try {

        logger.info('Query: ' + JSON.stringify(req.query));

        const users = await userService.findAll(req.query.filter, req.query.options);
        res.json(new Success(users));
        
    } catch (err) {
        next(err);
    }
};*/

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createCharacter = async (req, res, next) => {
    try {
        let c = req.body;
        c = await characterService.save(c);

        res.status(201).json(new Success(c));
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const updateCharacter = async (req, res, next) => {
    try {
        const { id } = req.params;
        let c = req.body;

        const characterUpdated = await characterService.update(id, c);

        res.json(new Success(characterUpdated));
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
/*const getById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        res.json(new Success(user));
    } catch (err) {
        next(err);
    }
};*/

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
/*const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.remove(id);
        res.json(new Success(user));
    } catch (err) {
        next(err);
    }
};*/

module.exports = {
    //getAllUsers,
    createCharacter,
    updateCharacter,
    //getById,
    //deleteUser
}