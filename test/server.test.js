
const blogDb = require("../models/Post");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

before((done) => {
    blogDb.deleteMany({}, function (err) { });
    done();
})



describe('/api/posts TEST on the bloges_DB Collection', () => {
    it("should verify that we have 0 blogs in the DB", (done) => {
        chai.request(app)
            .get("/api/posts")
            .end((err, res) => {
                let blogData = res.body;
                //using expect
                expect(res).to.have.status(202);
                expect(blogData).to.be.an('array');
                expect(blogData).to.have.lengthOf(0);
                done()
            })
    })

    it("should POST a valid  blogs in the database", (done) => {
        let titleArr = ['one', 'two', 'three'];
        for (let i = 0; i < titleArr.length; i++) {
           let blog = {
                title: titleArr[i] + " last 1234 test of posting the data in database",
                body: titleArr[i] + " USING MOCHA AND CHAI to test the end points",
                author: titleArr[i] + " Hello hellofrom sylvain during testing",
                date: "20/3/2022"
            }
            chai.request(app)
                .post("/api/posts")
                .send(blog)
                .end((err, res) => {
                    let blogData = res.body;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(blogData).to.have.any.keys(' Comment', 'title', 'author', 'body', "__v", "_id", "date");
                    expect(blogData.author, blogData.date, blogData.title, blogData.body).to.be.a('string');
                    expect(blogData. Comment).to.be.an("array");
                })
        }
        done();
    })

    it("Should retrieve posts from database", (done) => {
        let len;
        chai.request(app)
            .get("/api/posts")
            .end((err, res) => {
                var blogs = res.body;
                len = blogs.length;
                res.should.have.status(202);
                expect(blogs).to.be.an("array");
                expect(blogs[0]).to.be.an('object');
                expect(len).to.not.be.an('undefined');
                done();
                })
            })
//     })

describe('/api/posts/:id  GET', () => {
    it('it should GET a blog by the given id', (done) => {
        let blog = new blogDb({ title: "The Lord of the Rings", 
        author: "J.R.R. Tolkien",
         body: "hello", date: "1170" });
          blog.save((err, blog) => {
              chai.request(app)
              .get(`/api/posts/${blog._id}`)
            .send(blog)
            .end((err, res) => {
                    let bloge = res.body;
                    res.should.have.status(201);
                    expect(bloge).to.be.an('object');
                    expect(bloge).to.have.any.keys('Comment', 'title', 'author', 'body', "__v", "_id", "date");
                    expect(bloge.title).to.be.a("string");
                    expect(bloge.title).to.be.equal("The Lord of the Rings");
                    done();
                });
        });

    });
});

describe('/api/posts/:id  PUT', () => {
    it('it should UPDATE a blog given the id', (done) => {
            let blog = new blogDb({
                title: "The Chronicles of Narnia",
             author: "C.S. Lewis",
             body: '1948'});
            blog.save((err, blog) => {
                  chai.request(app)
                  .put(`/api/posts/${blog._id}`)
                  .send({
                    title: "The Chronicles of Narnia",
                 author: "C.S. Lewis",
                 body: '1948', 
               pages: 778})
                  .end((err, res) => {
                    let data = res.body;
                    res.should.have.status(202);
                    data.should.be.a('object');
                    data.should.have.property('title').eql("The Chronicles of Narnia");
                    done();
                });
        });
    });
});
describe('/api/posts/:id/comment .. PUT', () => {
    it('it should ADD the comment to the blog with the id', (done) => {
        let bloge = new blogDb({
            title: "The king of tyre",
            body: "nkusi ARTHUR",
            author: "the Comment Addition testing",
            date: "12/34/5050"
        })
        bloge.save((err, blog) => {
            // console.log(blog);
            chai.request(app)
                .put(`/api/posts/${blog._id}/comment`)
                .send({
                    newCom: "The comment added specified id"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('comment has been committed to the blog!!');
                    console.log(res.body)
                    done();
                });
        });
    });
})

describe('/api/posts DELETE', () => {
    it('it should DELETE a post given the id', (done) => {
        let post = new blogDb({
            title: "this is the first article",
            body: "this is the body of the post",
            author: 'ALAIN'
        });
            post.save((err, pst) => {
                 chai.request(app)
                 .delete(`/api/posts/${pst._id}`)
                 .end((err, res) => {
                     let data = res.body;
                      res.should.have.status(202);
                      res.body.should.have.property('message');
                      res.body.message.should.equal('Post deleted Successfuly!!');
                     done();
                            });
                    });
                });
            });


})
