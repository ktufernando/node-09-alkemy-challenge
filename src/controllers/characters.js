const express = require('express');
const characterService = require('../services/characterService');
const imageService = require('../services/imageService');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAllCharacters = async (req, res, next) => {
    try {

        logger.info('Query: ' + JSON.stringify(req.query));

        const {filter = '', options = ''} = req.query;

        const characters = await characterService.findAll(filter, options);
        res.json(new Success(characters));
        
    } catch (err) {
        next(err);
    }
};

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
const getCharacterById = async (req, res) => {
    try {
        const c = await characterService.findById(req.params.id);
        res.json(new Success(c));
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteCharacter = async (req, res, next) => {
    try {
        const { id } = req.params;
        const c = await characterService.remove(id);
        res.json(new Success(c));
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
 const uploadCharacterImage = async (req, res, next) => {
    try {

        const characterId = req.body.id;
        const image = req.file;

        res.json(new Success(await imageService.uploadCharacterImage(characterId, image)));
    } catch (err) {
        next(err);
    }
};



module.exports = {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    getCharacterById,
    deleteCharacter,
    uploadCharacterImage
}