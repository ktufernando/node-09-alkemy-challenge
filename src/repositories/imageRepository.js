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
                resolve(`https://${config.aws.s3BucketName}.s3.amazonaws.com/${Key}`);
            });
        })
        
    }

    deleteImage(Key){
        Key = Key.split('/')[3];
        return new Promise((resolve, reject)=> {
            const params = {
                Bucket: config.aws.s3BucketName,
                Key
            };
            console.log(params);
            this.s3.deleteObject(params, (err, data) => {
                if (err) {
                    reject(new AppError(err.message, 502));
                }
                console.log(JSON.stringify(data));
                resolve(true);
            });
        })
        
    }



}

module.exports = ImageRepository;