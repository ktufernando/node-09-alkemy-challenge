const bcrypt = require('bcrypt');
const User = require('../models/user');

class UserRepository {

    constructor(){

    }


    async findAll(){
        return await User.findAll();
    }

    /*async findAllWithPagination(filter, options){
        return await User.paginate(filter, options);
    }*/

    async findById(id) {
        return await User.findByPk(id);
    }
    
    //FIXME Hacer query
    async findByEmail(email) {
        return await User.findOne({ where: { email } })
    }

    async save(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return await User.create(user);
    }

    async update(id, user){
        return await User.update(user, {
            where: {
              id
            }
          });
    }

    async remove(id) {
        return await User.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = UserRepository;