const Pool = require('pg').Pool
const pool = new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
})

const { matchedData } = require('express-validator/filter');


function getAllDependencies(req, res){
	pool.query("SELECT * FROM dependencies", (error, results) => {

	if (error) {
		throw error
	}

	res.status(200).json(results.rows)
	})
}

function insertDependency(req, res){	
	const from_id = req.body.from_id
	const to_id = req.body.to_id
	const active = true
	
    pool.query(
      'INSERT INTO dependencies (from_id, to_id, active) VALUES ($1, $2, $3)',
      [from_id, to_id, active],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Dependency inserted`)
      }
    )
}

module.exports = {
	getAllDependencies,
	insertDependency
}
