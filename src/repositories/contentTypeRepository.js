const ContentType = require('../models/contentTypes');

class ContentTypeRepository {

    constructor(){

    }

    async findById(id) {
        return await ContentType.findByPk(id);
    }
    
    async findByDescription(description) {
        return await ContentType.findOne({ where: { description } })
    }

}

module.exports = ContentTypeRepository;