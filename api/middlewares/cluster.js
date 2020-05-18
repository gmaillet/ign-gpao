const { matchedData } = require('express-validator/filter');

async function getAllClusters(req, res, next) {
  const results = await req.pgPool.query('SELECT * FROM cluster')
    .catch((error) => {
      req.error = {
        msg: error.toString(),
        code: 500,
        function: 'getAllClusters',
      };
    });
  req.result = results.rows;
  next();
}


async function insertCluster(req, res, next) {
  const params = matchedData(req);

  const { host } = params;

  const results = await req.pgPool.query(
    'INSERT INTO cluster (host, id_thread, active, available) VALUES ( $1 , (select count(id) from cluster where host = $2), true, true ) RETURNING id',
    [host, host],
  )
    .catch((error) => {
      req.error = {
        msg: error.toString(),
        code: 500,
        function: 'insertCluster',
      };
    });
  req.result = results.rows;
  next();
}

module.exports = {
  getAllClusters,
  insertCluster,
};
