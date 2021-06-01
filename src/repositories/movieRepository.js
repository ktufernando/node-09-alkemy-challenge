const { Op } = require("sequelize");
const Movie = require('../models/movies');
const Character = require('../models/characters');
const GenderType = require('../models/genderTypes');
const { parseISO } = require('date-fns');



class MovieRepository {

    constructor() {

    }

    async findAll({title, calification, creationDate}, {limit, offset, order}) {
        let where = {};
        if (title) {
            where.title = {
                [Op.like]: `%${title}%`
            }
        }
        if (calification) {
            where.calification = {
                [Op.eq]: calification
            }
        }
        if (creationDate) {
            where.creationDate = {
                [Op.eq]: creationDate
            }
        }

        let config = {
            where,
            attributes: ['title', 'image', 'creationDate'],
            
        }
        if(order){
            config.order = [order.split(';')];
        }

        return await Movie.findAll(config);
    }

    async findById(id) {
        return await Movie.findByPk(id);
    }
    
    async findByIdWithCharacters(id) {
        return await Movie.findByPk(id, {
            include: [
              'characters',
              'genderType',
              'contentType'
            ],
            attributes: ['id', 'title', 'image', 'creationDate', 'calification']
          });
    }

    async findByTitle(title) {
        return await Movie.findOne({ where: { title } })
    }

    async save(m) {
        return await Movie.create(m, {
            include: [GenderType]
        });
    }

    async update(id, m) {
        return await Movie.update(m, {
            where: {
                id
            }
        });
    }

    async remove(id) {
        return await Movie.destroy({
            where: {
                id
            }
        });
    }

}

module.exports = MovieRepository;