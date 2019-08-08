var chai = require('chai');
var chaiHttp = require('chai-http');
var server = 'http://localhost:4444/contactmanagement/contactgroup';
var expect = chai.expect;
let should = chai.should();

chai.use(chaiHttp);



describe('contactgroup', function() {
  it('should list ALL contactgroup on /contactgroup GET');
  it('should list a SINGLE contactgroup on /contactgroup/:name GET');
  it('should add a SINGLE contactgroup on /contactgroup POST');
  it('should update a SINGLE contactgroup on /contactgroup/:name PUT');
  it('should delete a SINGLE contactgroup on /contactgroup/:name DELETE');
});

it('should list ALL contactgroup on /contactgroup GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
          console.log('res');
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.statusCode.should.equal('0000');
          res.body.statusDesc.should.equal('SUCCESS');
          res.body.contactGroups.should.be.a('array');
        done();
      });
  });


  it('should add a SINGLE contactgroup on /contactgroup POST', function(done) {
    chai.request(server)
      .post('/')
      .send({
        "name":"Test",
        "contacts":[{
            "name":"Preetha2",
            "phone":{
                "work":9962654089
            }
            
        }]
    })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.statusCode.should.equal('0000');
        res.body.statusDesc.should.equal('SUCCESS');
        done();
      });
  });

  it('should get a SINGLE contactgroup on /contactgroup GET', function(done) {
    chai.request(server)
      .get('/Test')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.statusCode.should.equal('0000');
        res.body.statusDesc.should.equal('SUCCESS');
        res.body.contactGroup.should.be.a('object');
        res.body.contactGroup.name.should.be.a('string');
        res.body.contactGroup.contacts.should.be.a('array');
        done();
      });
  });

  it('should update a SINGLE contactgroup on /contactgroup PUT', function(done) {
    chai.request(server)
      .put('/Test')
      .send({
        "name":"Test",
        "contacts":[{
            "name":"Preetha2",
            "phone":{
                "work":9962654089
            }
            
        },
        {
            "name":"Preetha3",
            "phone":{
                "work":9962654089
            }
            
        }]
    })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.statusCode.should.equal('0000');
        res.body.statusDesc.should.equal('SUCCESS');
        done();
      });
  });

  it('should delete a SINGLE contactgroup on /contactgroup DELETE', function(done) {
    chai.request(server)
      .delete('/Test')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.statusCode.should.equal('0000');
        res.body.statusDesc.should.equal('SUCCESS');
        done();
      });
  });