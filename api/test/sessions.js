const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('..');

const should = chai.should();
chai.use(chaiHttp);

let idSession;

describe('Sessions', () => {
  after((done) => {
    server.close();
    done();
  });

  describe('Get sessions', () => {
    it('should return an array', (done) => {
      chai.request(server)
        .get('/api/sessions')
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('Put session', () => {
    it('insert a valid session', (done) => {
      const hostname = String(Date.now());
      chai.request(server)
        .put('/api/session')
        .query({ host: hostname })
        .end((err, res) => {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.be.an('array');
          idSession = res.body[0].id;
          done();
        });
    });
  });
});

describe('Close session', () => {
  it('close a session', (done) => {
    chai.request(server)
      .post('/api/session/close')
      .query({ id: idSession })
      .end((err, res) => {
        should.equal(err, null);
        res.should.have.status(200);
        done();
      });
  });
});
