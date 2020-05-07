const jobs = require('./../middlewares/job')
const projects = require('./../middlewares/project')
const clusters = require('./../middlewares/cluster')
const router = require('express').Router()

var ihm_data = {}
var electron = 'off';

// home page
router.get('/', function(req, res) {
    console.log("index.js: home page")
    res.render('./pages/index', {electron:electron, ihm_data:ihm_data});
});

// job page
router.get('/job', jobs.getJobs, function(req, res) {
   console.log("index.js: job page")
    var array = []
  
    for(var i in req.body){
      array.push(req.body[i])
    }
  
    res.render('./pages/job', {json:array})
  })
  

// project page 
router.get('/project', projects.getProjects, function(req, res) {
   console.log("index.js: project page")

    var array = []
  
    for(var i in req.body){
      array.push(req.body[i])
    }
    res.render('./pages/project', {json:array})
})
  
// cluster page 
router.get('/cluster', clusters.getClusters, function(req, res) {
   console.log("index.js: cluster page")
    var array = []

    for(var i in req.body){
      array.push(req.body[i])
    }
    res.render('./pages/cluster', {json:array})
})

// new project page
router.get('/creation', function(req, res) {
   // new project page
   console.log("index.js: creation page (get)")
   res.render('./pages/creation',{ihm_data:ihm_data['ihm'], electron:electron})
})
           
// new project page
router.post('/creation', function(req, res) {
    console.log("index.js: creation page")
    var body = ""
    req.on('data', function (chunk) {
      body += chunk
    })
    req.on('end', function () {
       ihm_data = JSON.parse(body)
       electron = 'on'
       res.render('./pages/creation',{ihm_data:ihm_data['ihm'], electron:electron})
    })
    req.on('error', function(e) {
         console.log('problem with request: ' + e.message);
    })
})

// new project page
router.post('/creategpao', function(req, res) {
    console.log("index.js: creategpao")
    
})


module.exports = router
