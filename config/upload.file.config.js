const multer = require('multer');
const util = require("util");
const path = require("path");

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// }

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'public/assets/files');
    },
    filename: (req, file, callback)=>{
        var name = Math.floor(Math.random() * Math.floor(15252)).toString();
        name += Math.floor(Math.random() * Math.floor(854465)).toString();
        name += Date.now()+".";

        console.log(file);
        const extension = file.originalname.split('.').pop();
        name += extension;

        callback(null, name);
    }
})

var uploadFiles = multer({ storage: storage }).array("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;