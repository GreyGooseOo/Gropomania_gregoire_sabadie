//appel du plugin pour le bon fonctionnement du middleware
var fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// fonction permettant de creer une chaine de caratère aléatoire
function strRandom(o) {
  var a = 10,
    b = 'abcdefghijklmnopqrstuvwxyz',
    c = '',
    d = 0,
    e = '' + b;
  if (o) {
    if (o.startsWithLowerCase) {
      c = b[Math.floor(Math.random() * b.length)];
      d = 1;
    }
    if (o.length) {
      a = o.length;
    }
    if (o.includeUpperCase) {
      e += b.toUpperCase();
    }
    if (o.includeNumbers) {
      e += '1234567890';
    }
  }
  for (; d < a; d++) {
    c += e[Math.floor(Math.random() * e.length)];
  }
  return c;
}

//fonction permmettant d'enregistrer l'image du profil dans le back
module.exports = (req, res, next) => {
  try {
    //verification que l'on reçois bien uri de l'image
    if (req.body.photo_url.split('images/')[0] !== "http://localhost:3000/" && req.body.photo_url !== '' && req.body.photo_url !== null) {
      var uri = req.body.photo_url;
      var data = uri.split(',')[1];
      var buf = Buffer.from(data, 'base64');

      const extension = MIME_TYPES[uri.split(';')[0].split('data:')[1]];
      if (req.body.pseudo) {
        var filename = `photo_profil/${req.body.pseudo}.${extension}`;
      } else {
        var name = strRandom({ includeUpperCase: true, includeNumbers: true, length: 20, startsWithLowerCase: true })
        var filename = `photo_posts/${name}.${extension}`;
      }
      req.file = { filename }
      //creation de l'image dans le dossier images du back
      fs.writeFileSync(`./images/${filename}`, buf);

      next();
    } else {
      if (req.body.pseudo) {
        var filename = req.body.photo_url.split('images/')[1];
      } else {
        var filename = "no file needed"
      }
      req.file = { filename };
      next();
    }

  } catch {
    res.status(401).json({ message: 'image non chargé', isErr: true });
  }
}