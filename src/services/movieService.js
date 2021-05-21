const MovieRepository = require('../repositories/movieRepository');
const GenderTypeRepository = require('../repositories/genderTypeRepository');
const ContentTypeRepository = require('../repositories/contentTypeRepository');
const repository = new MovieRepository();
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();

const findById = async(id) => {
    return await repository.findById(id);
}

const findByTitle = async(title) => {
    return await repository.findByTitle(title);
}


//FIXME: Implementar los filtros
const findAll = async(filter, options) => {
    //return await repository.findAllWithPagination(filter, options);
    return await repository.findAll(filter, options);
}


const save = async(m) => {
    const genderType = await genderTypeRepository.findByDescription(m.genderType);
    const contentType = await contentTypeRepository.findByDescription(m.contentType);
    m.genderTypeId = genderType.id; 
    m.contentTypeId = contentType.id;
    return await repository.save(m);
}


const update = async(id, m) => {
    if(m.genderType){
        const genderType = await genderTypeRepository.findByDescription(m.genderType);
        const contentType = await contentTypeRepository.findByDescription(m.contentType);
        m.genderTypeId = genderType.id;
        m.contentTypeId = contentType.id;
    }
    return await repository.update(id, m);
}

const remove = async(id) => {
    return await repository.remove(id);
}

module.exports = {
    findById,
    findByTitle,
    findAll,
    save,
    update,
    remove
}