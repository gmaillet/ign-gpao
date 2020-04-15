const router = require('express').Router()
const { query, body, param, oneOf } = require('express-validator/check');

const dependencies = require('./../../middlewares/dependencies')

router.get('/dependencies', dependencies.getAllDependencies)

router.put('/dependency', 
    body('from_id').exists(),body('to_id').exists(),
    dependencies.insertDependency)
    
module.exports = router
