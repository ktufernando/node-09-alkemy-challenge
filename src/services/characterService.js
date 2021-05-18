const CharacterRepository = require('../repositories/characterRepository');
const repository = new CharacterRepository();

const findById = async(id) => {
    return await repository.findById(id);
}

const findByName = async(name) => {
    return await repository.findByName(name);
}


//FIXME: Implementar los filtros
const findAll = async(filter, options) => {
    //return await repository.findAllWithPagination(filter, options);
    return await repository.findAll();
}


const save = async(c) => {
    return await repository.save(c);
}


const update = async(id, c) => {
    return await repository.update(id, c);
}

const remove = async(id) => {
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