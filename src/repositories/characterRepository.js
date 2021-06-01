const { Op } = require("sequelize");
const Character = require('../models/characters');
const Movie = require('../models/movies');

class CharacterRepository {

    constructor(){

    }

    //TODO: implementar filtro de movieTitle
    async findAll({name, age, weigth, movieTitle}, {limit, offset, order}){

        let where = {};
        if (name) {
            where.name = {
                [Op.like]: `%${name}%`
            }
        }
        if (age) {
            where.age = {
                [Op.eq]: age
            }
        }
        if (weigth) {
            where.weigth = {
                [Op.eq]: weigth
            }
        }

        return await Character.findAll({
            where,
            attributes: ['name', 'image'],
        });
    }

    async findById(id) {
        return await Character.findByPk(id);
    }
    
    async findByIdWithMovies(id) {
        return await Character.findByPk(id, {
            include: [
              {
                model: Movie,
                as: "movies"
              },
            ],
          });
    }
    
    async findByName(name) {
        return await Character.findOne({ where: { name } })
    }

    async save(c) {
        return await Character.create(c);
    }

    async update(id, c){
        return await Character.update(c, {
            where: {
              id
            }
          });
    }

    async remove(id) {
        return await Character.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = CharacterRepository;