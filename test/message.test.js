const Messagedb = require("../models/message");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);


before((done) => {
    Messagedb.deleteMany({}, function (err) { });
    done();
})



describe('/api/messages TEST on the messagees_DB Collection', () => {
    it("should verify that we have 0 messages in the DB", (done) => {
        chai.request(app)
            .get("/api/messages")
            .end((err, res) => {
                let messageData = res.body;
                //using expect
                expect(res).to.have.status(202);
                expect(messageData).to.be.a('array');
                expect(messageData).to.have.lengthOf(0);
                done()
            })
    })

    it("should POST a valid  messages in the database", (done) => {
        let titleArr = ['one', 'two', 'three'];
        for (let i = 0; i < titleArr.length; i++) {
           let message = {
                name: titleArr[i] + "the game",
                email: titleArr[i] + "@gmail.com",
                phone: titleArr[i] + " 0784555555555",
                message: " welcome to the messages database"
            }
            chai.request(app)
                .post("/api/messages")
                .send(message)
                .end((err, res) => {
                    let messageData = res.body;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(messageData).to.have.all.keys('name', 'email', 'phone',"message", "__v", "_id", "createdAt","updatedAt");
                    expect(messageData.name, messageData.email, messageData.phone, messageData.message).to.be.a('string');
                })
        }
        done();
    })

    it("Should retrieve messages from database", (done) => {
        let len;
        chai.request(app)
            .get("/api/messages")
            .end((err, res) => {
                var messages = res.body;
                len = messages.length;
                res.should.have.status(202);
                expect(messages).to.be.an("object");
                expect(messages[0]).to.be.an('object');
                expect(len).to.not.be.an('undefined');
                done();
                })
            })

describe('/api/messages/:id  GET', () => {
    it('it should GET a message by the given id', (done) => {
        let message = new Messagedb({
             name: "The Lord of all kingdom", 
             email: "UWINEMA",
             message: "hello there"
             });
             message.save((err, sms) => {
                 chai.request(app)
                 .get(`/api/messages/${sms._id}`)
                 .send(message)
                 .end((err, res) => {
                     let text = res.body;
                     res.should.have.status(201);
                     expect(text).to.be.an('object');
                     expect(text).to.have.any.keys('name', 'email', 'phone', 'message', "__v", "_id", "createdAt","updatedAt");
                      expect(text.name).to.be.a("string");
                      expect(text.name).to.be.equal("The Lord of all kingdom");
                      done();
                    });
                    });
            
                });
            });            
        
describe('/api/messages DELETE', () => {
    it('it should DELETE a message given the id', (done) => {
        let message = new Messagedb({
            name: "Mugisha Irene",
            email: "alain.K",
            phone: '07890000', 
            message: 'This is the testing message'});
            message.save((err, sms) => {
                 chai.request(app)
                 .delete(`/api/messages/${sms._id}`)
                 .end((err, res) => {
                     let data = res.body;
                      res.should.have.status(202);
                      res.body.should.have.property('message');
                      res.body.message.should.equal('Messages deleted Successfuly!!');
                     done();
                            });
                    });
                });
            });
    })