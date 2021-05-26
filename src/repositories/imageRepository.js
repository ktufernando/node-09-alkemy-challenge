const AWS = require('aws-sdk');
const config = require('../config');
const AppError = require('../errors/appError');


class ImageRepository {

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: config.aws.accessKeyId,
            secretAccessKey: config.aws.privateAccessKey
        });
    }

    uploadImage(name, image, type) {
        const Key = `${name}.${type.split('/')[1]}`;
        return new Promise((resolve, reject)=> {
            const params = {
                Bucket: config.aws.s3BucketName,
                Key,
                Body: image,
                ContentType: type,
                ACL: 'public-read'
            };
    
            this.s3.upload(params, (err, data) => {
                if (err) {
                    reject(new AppError(err.message, 502));
                }
                
                //TODO: 1. armar url de descarga de imagen y retornarla 
                //- 2 actualizar la tabla de personaje o pelicula (En otra capa)
                console.log(`####### Image location: ${data.location}`);
                resolve(`https://${config.aws.s3BucketName}.s3.amazonaws.com/${Key}`);
            });
        })
        
    }



}

module.exports = ImageRepository;