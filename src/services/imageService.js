const ImageRepository = require('../repositories/imageRepository');
const CharacterRepository = require('../repositories/characterRepository');
const MovieRepository = require('../repositories/movieRepository');
const imageRepository = new ImageRepository();
const characterRepository = new CharacterRepository();
const movieRepository = new MovieRepository();

const uploadCharacterImage = async(idCharacter, file) => {

    const character = await characterRepository.findById(idCharacter);
    const imageURL = await imageRepository.uploadImage(character.name, file.buffer, file.mimetype);
    return await characterRepository.update(idCharacter, {image: imageURL});
    
}

const uploadMovieImage = async(idMovie, file) => {

    const movie = await movieRepository.findById(idMovie);
    const imageURL = await imageRepository.uploadImage(movie.title, file.buffer, file.mimetype);
    return await movieRepository.update(idMovie, {image: imageURL});

}

module.exports = {
    uploadCharacterImage,
    uploadMovieImage
}