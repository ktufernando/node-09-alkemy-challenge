const CharacterRepository = require('../repositories/characterRepository');
const repository = new CharacterRepository();
const ImageRepository = require('../repositories/imageRepository');
const imageRepository = new ImageRepository();

const findById = async(id) => {
    return await repository.findByIdWithMovies(id);
}

const findByName = async(name) => {
    return await repository.findByName(name);
}


const findAll = async(filter, options) => {
    return await repository.findAll(filter, options);
}


const save = async(c) => {
    return await repository.save(c);
}


const update = async(id, c) => {
    return await repository.update(id, c);
}

const remove = async(id) => {
    const c = await repository.findById(id);
    imageRepository.deleteImage(c.image);
    return await repository.remove(id);
}

module.exports = {
    findById,
    findByName,
    findAll,
    save,
    update,
    remove
}