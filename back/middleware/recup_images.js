//appel du plugin pour le bon fonctionnement du middleware
var fs = require('fs'); 

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//fonction permmettant d'enregistrer l'image du profil dans le back
module.exports = (req, res, next) => {
  try {
    //verification que l'on reçois bien uri de l'image
    if(req.body.photo_url.split('images/')[0] !== "http://localhost:3000/" && req.body.photo_url !== '' && req.body.photo_url !== null){
      var uri = req.body.photo_url; 
      var data = uri.split(',')[1];
      var buf = Buffer.from(data,'base64');

      const extension = MIME_TYPES[uri.split(';')[0].split('data:')[1]];
      if(req.body.pseudo){
        var filename = `photo_profil/${req.body.pseudo}.${extension}`;
      }else{
        var filename = `photo_posts/${req.body.titre}.${extension}`;
      }
      req.file = { filename }
      //creation de l'image dans le dossier images du back
      fs.writeFileSync(`./images/${filename}`, buf);

      next();
    }else{
      if(req.body.pseudo){
        var filename = "icon.png";
      }else{
        var filename = "no file needed"
      }
      req.file = { filename };
      next();
    }
  
  } catch(error){
    console.error(error);
  res.status(401).json( {message: 'image non chargé' , isErr: true});
  }
}