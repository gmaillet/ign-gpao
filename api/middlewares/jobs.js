const { matchedData } = require('express-validator/filter');
const debug = require('debug')('job');

async function getAllJobs(req, res, next) {
  const results = await req.pgPool.query('SELECT * FROM jobs')
    .catch((error) => {
      req.error = {
        msg: error.toString(),
        code: 500,
        function: 'getAlljobs',
      };
    });
  req.result = results.rows;
  next();
}

async function getJobReady(req, res, next) {
  const params = matchedData(req);

  const id = params.id_cluster;
  const results = await req.pgPool.query(
    "UPDATE jobs SET status = 'running', start_date=NOW(), id_cluster = $1 WHERE id = (SELECT id FROM jobs WHERE status = 'ready' LIMIT 1) RETURNING id, command", [id],
  )
    .catch((error) => {
      req.error = {
        msg: error.toString(),
        code: 500,
        function: 'getJobReady',
      };
    });
  req.result = results.rows;
  next();
}

async function updateJobStatus(req, res, next) {
  const params = matchedData(req);
  const { id } = params;
  const { status } = params;
  const { returnCode } = params;
  const { log } = params;

  debug(`id = ${id}`);
  debug(`status = ${status}`);
  debug(`return_code = ${returnCode}`);
  debug(`log = ${log}`);

  const results = await req.pgPool.query(
    'UPDATE jobs SET status = $1, log = $2, return_code = $4, end_date=NOW() WHERE id = $3', [status, log, id, returnCode],
  )
    .catch((error) => {
      req.error = {
        msg: error.toString(),
        code: 500,
        function: 'updateJobStatus',
      };
    });
  req.result = results.rows;
  next();
}

module.exports = {
  getAllJobs,
  getJobReady,
  updateJobStatus,
};
