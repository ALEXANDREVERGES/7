const express = require('express');
const  fileUpload  =  require ( 'express-fileupload' ) ; 
const cors = require('cors');
//importer le package HTTP de NODE JS pour avoir les outils pour créer le server
const http = require('http');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post')
const bodyParser = require ('body-parser');
const db = require('../backend/data/databaseConnect');
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**a fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur*** */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

//gérer les problèmes de CORS (Cross - Origin - Request - Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//**************************************** */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//************************************************************************************************************************** */
//  app.use('/images', express.static(path.join(__dirname, "images")));
app.use(express.static("images"));
app.use('/auth', userRoutes);
app.use('/api', postRoutes);


app.post('/upload', function (req, res){
  let imageFile;
  let uploadPath;
 
  console.log("req.files.image--->",req.files.IMG);
  if  ( !req.files  ||  Object.keys( req.files ).length  ===  0 )  { 
    return  res.status( 400 ) . send ( 'Aucun fichier téléchargé' ) ; 
  }
   imageFile  =  req.files.IMG;
   uploadPath  =  'C:/Users/33629/Documents/groupomania/frontend/src' + '/images/' + imageFile.name ;
  // uploadPath  = image.name ;
   
   console.log("uploadPath",uploadPath)
  imageFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
  });
})




//  app.post('/upload', function (req, res){  
//    const commentaire = req.body.commentaire;
//     const iduser = req.body.iduser;
//     const time = req.body.time;
//     const nom = req.body.nom;
//     const prenom = req.body.prenom;
//     console.log("req.body", req.body)
  

//  let img  =  req.files.image.data;
// console.log("req.files------>", req.files.image)

// let image = req.files.image;
//          if(req.files){
//          db.query("INSERT INTO post (commentaire, iduser, time, nom, prenom, images) VALUES(?,?,?,?,?,?)",[commentaire, iduser, time, nom, prenom, img], (err, results) => {
//     if(err){
//       res.status(400).json({err});
//     } 
//    if(results){
//        res.status(200).json({message : "Publication effectuée !" });
//        console.log("results", results)
//    }
//   })
//      }
     
//     let uploadPath;
   
   
//     if  ( !req.files  ||  Object.keys( req.files ).length  ===  0 )  { 
//       return  res.status( 400 ) . send ( 'Aucun fichier téléchargé' ) ; 
//     }
    
//      uploadPath  = __dirname + '/images/' + image.name ;
     
//      console.log(uploadPath)
//     image.mv(uploadPath, function(err) {
//       if (err)
//         return res.status(500).send(err);
//     });

  

  
//  })

const server = http.createServer(app);
//**écouteur d'évènements consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console*/
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);