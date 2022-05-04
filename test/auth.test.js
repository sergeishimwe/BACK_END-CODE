const userDb = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

before((done) => {
    userDb.deleteMany({}, function (err) {
    });
    done();
})

describe('/api/auth/register TEST on the bloges_DB Collection', () => {
    it("Should create a valid user into the databse", (done) => {
        let newUser = {
            username:"serge ishimwe",
            email: "sergeishimwe12@gmail.com",
            password: "test123"
        }
        chai.request(app)
            .post("/api/auth/register")
            .send(newUser)
            .end((err, res) => {
                let users = res.body;
                res.should.have.status(201);
                // expect(users).to.be.an('array');
                expect(users).to.be.an('object');
                expect(users).to.have.all.keys('userCred', 'token');
                expect(users.userCred).to.have.all.keys('email');
                expect(users.token, users.userCred.email, users.userCred.password).to.be.a('string');
                // console.log(users.userCred.email);
                done();
            })
    })

    it("Should login the user with the password and email", (done) => {
        let User = {
            email: "sergeishimwe12@gmail.com",
            password: "test123"
        }
        chai.request(app)
            .post("/api/auth/login")
            .send(User)
            .end((err, res) => {
                let users = res.body;
                res.should.have.status(200);
                expect(users).to.be.an('object');
                expect(users).to.have.all.keys('userCred', 'token');
                expect(users.userCred).to.have.all.keys('email', "message");
                expect(users.token, users.userCred.email,
                    users.userCred.password, users.userCred.status, users.userCred.message).to.be.a('string');
                // console.log(users.userCred.email,users.userCred.message);
                done();
            })
    })

    it("It should now get all users [in my case 1 user] with using the token obtained after logging in", (done) => {
        const tokeni = {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzgzYjFlZmY0MzQwNjM0NGFmZWQ3NCIsImlhdCI6MTY0Nzg3MDkwNCwiZXhwIjoxNjQ4MTMwMTA0fQ.tonlBq0uWzaVhpOR-gUuH1dkMISTZgSrlZ6QzctXTIo'
        }
        chai.request(app)
            .get("/api/users")
            // .send("Authorization", tokeni.token)
            .end((err, res) => {
                let users = res.body;
                res.should.have.status(202);
                expect(users).to.be.an('array');
                expect(users[0]).to.be.an('object');
                expect(users[0]).to.have.all.keys("username",'email','profilepicture','coverpicture','isAdmin','createdAt','updatedAt', 'password', "_id", "__v");
                expect(users[0].password, users[0].email).to.be.a('string');

                // console.log(users[0].email, users[0]._id);
                done();
            })
    })


    it("Should successfully logout the user with get request", (done) => {
        chai.request(app)
            .post("/api/auth/logout")
            .end((err, res) => {
                let users = res.body;
                res.should.have.status(202);
                // expect(users).to.be.an('array');
                expect(users).to.be.an('object');
                expect(users).to.have.all.keys('msg');
                expect(users.msg).to.be.a('string');
                expect(users.msg).to.be.equal("You have been Logged Out");
                // console.log(users.message);
                done();
            })
    })
})


// describe('AUTHENTICATION/  testing protected routes', function () {
//     it('Should not register the user twice', function (done) {
//         let newUser = {
//             email: "sergeishimwe12@gmail.com",
//             password: "test123"
//         }
//         chai.request(app)
//             // register request
//             .post('/api/auth/register')
//             .send(newUser
//             )
//             .end((err, res) => { // when we get a resonse from the endpoint
//                 res.should.have.status(400);
//                 res.body.message.should.be.equal("The user already exists");
//                 done();
//             });
//     })
// it('Should not allow one to register password < 6 character', function (done) {
//             let newUser = {
//                 email: "sergeishimwe@gmail.com",
//                 password: "tet12"
//             }
//             chai.request(app)
//                 // register request
//                 .post('/api/auth/register')
//                 .send(newUser
//                 )
//                 .end((err, res) => { // when we get a resonse from the endpoint
//                     res.should.have.status(400);
//                     res.body.message.should.be.equal("Enter minimum 6 character of password");
//                     done();
//                 });
//         })
//    })


