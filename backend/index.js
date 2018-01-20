var cors = require('cors');
var express = require('express');
var session = require('express-session');
var contentType = require('content-type')
var app = express();

app.use(session({ resave: true ,secret: 'mysecrettoken' , saveUninitialized: true }));

app.use(cors({credentials: true, origin: true}));
app.options('*', cors());

app.get('/getTaches', function(req, res){

  if(!req.session.index){
    req.session.index = 0;
    req.session.taches = [];
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(req.session.taches)
});

app.post('/delete/:id', function(req, res){

  let index = 0;
  req.session.taches.some(function(tache) {

    if(tache.id == req.params.id){
      req.session.taches.splice(index,1);
      return;
    }
    index++;
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(req.params.id);
});

app.post('/add/:title/:message', function(req, res){

  if(!req.session.index){
    req.session.index = 0;
    req.session.taches = [];
  }
  newTache = {
    id: req.session.index,
    title: req.params.title,
    message: req.params.message
  }
  req.session.index++;
  req.session.taches.push(newTache)

  res.setHeader("Content-Type", "text/plain");
  res.send(true);
});

app.post('/update/:id/:title/:message', function(req, res){

  let tabTaches = req.session.taches;

  for(var i in tabTaches){
    if(req.session.taches[i].id == req.params.id){
      req.session.taches[i].title = req.params.title;
      req.session.taches[i].message = req.params.message;
      break;
    }
  }
  res.setHeader("Content-Type", "text/plain");
  res.send(true);
});


app.listen(3000, function(){
  console.log('listening on 3000');
});
