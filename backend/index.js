import express from 'express';
import { msg } from './controllers/responseMsgs.js';


const app = express()
const port = 8090;
var bodyParser  = require('body-parser');
import jwt from "jsonwebtoken";

var session = require('express-session')

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(
  session({
      resave: false,
      saveUninitialized: true,
      secret: "anyrandomstring",
    })
  );

const routing = require('./routes/index.js')
app.post('/*',(req,res,next)=>{
  
  if (req.url === '/' || req.url === '/login' || req.url === 'yenikayit') return next();
 else {
  jwt.verify(req.session.token, 'secret', function(err, decoded) {
    if(err) res.json({msg:msg.Unauthorized });
    else
    return next();
  });
 }
})
app.use('/', routing)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})