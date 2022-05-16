//appel du plugin pour le bon fonctionnement du middleware
/*const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
console.log(99)
//stokage de l'image enregistré par l'utilisateur dans le dossier "images" du serveur grâce a multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
    
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
module.exports = multer({storage: storage}).single('image');*/
var fs = require('fs'); 

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

module.exports = (req, res, next) => {
  try {
  var uri = req.body.photo_url; 
  var data = uri.split(',')[1];
  var buf = Buffer.from(data,'base64');
  const extension = MIME_TYPES[uri.split(';')[0].split('data:')[1]];
  var filename = `photo_profil_${req.body.pseudo}.${extension}`;
  req.file = { filename }
  fs.writeFileSync(`./images/${filename}`, buf);
  next();
  } catch {
    console.log("err")
  res.status(401).json({error: new Error('Invalid request!')});
  }
}