var chai = require('chai');
var chaiHttp = require('chai-http');
var server = 'http://localhost:4444/contactmanagement/contact';
var expect = chai.expect;
let should = chai.should();

chai.use(chaiHttp);


describe('contacts', function() {
  it('should list ALL contacts on /contact GET');
  it('should list a SINGLE contact on /contact/:name GET');
  it('should add a SINGLE contact on /contact POST');
  it('should update a SINGLE contact on /contact/:name PUT');
  it('should delete a SINGLE contact on /contact/:name DELETE');
});

it('should list ALL contacts on /contact GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
          console.log('res');
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.statusCode.should.equal('0000');
          res.body.statusDesc.should.equal('SUCCESS');
          res.body.contacts.should.be.a('array');
        done();
      });
  });


  it('should add a SINGLE Contact on /contact POST', function(done) {
    chai.request(server)
      .post('/')
      .send({'name': 'Preetha', 'phone': {'personal': 9962654068}})
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.statusCode.should.equal('0000');
        res.body.statusDesc.should.equal('SUCCESS');
        done();
      });
  });

  it('should get a SINGLE Contact on /contact GET', function(done) {
    chai.request(server)
      .get('/Preetha')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.statusCode.should.equal('0000');
        res.body.statusDesc.should.equal('SUCCESS');
        res.body.contact.should.be.a('object');
        res.body.contact.name.should.be.a('string');
        res.body.contact.phone.personal.should.be.a('number');
        done();
      });
  });

  it('should update a SINGLE Contact on /contact PUT', function(done) {
    chai.request(server)
      .put('/Preetha')
      .send({'name': 'Preetha', 'phone': {'work': 9962654068}})
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.statusCode.should.equal('0000');
        res.body.statusDesc.should.equal('SUCCESS');
        done();
      });
  });

  it('should delete a SINGLE Contact on /contact DELETE', function(done) {
    chai.request(server)
      .delete('/Preetha')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.statusCode.should.equal('0000');
        res.body.statusDesc.should.equal('SUCCESS');
        done();
      });
  });