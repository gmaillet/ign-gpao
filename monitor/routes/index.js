const jobs = require('./../middlewares/job')
const router = require('express').Router()



// home page
router.get('/', function(req, res) {
    res.render('pages/index');
});

// job page
router.get('/job', jobs.getJobs, function(req, res) {
    var array = []
  
    for(var i in req.body){
      array.push(req.body[i])
    }
  
    res.render('pages/job', {json:array})
  })
  
// chantier page 
router.get('/chantier', function(req, res) {
    res.render('pages/chantier')
})
  
// ressource page 
router.get('/ressource', function(req, res) {
    res.render('pages/ressource')
})

// ressource creation

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/creation', function(req, res) {
    var jsonfile = '../data/ihm.json';
    ihm_data = require(jsonfile)['ihm'];
    res.render('pages/creation', {json:ihm_data})
})

router.post('/getParams', function(req, res) {
    console.log(JSON.stringify(req.body, null, '\t  '));

    res.send(JSON.stringify(req.body, null, '\t  '));
});


module.exports = router
