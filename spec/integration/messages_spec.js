const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const sequelize = require("../../src/db/models/index").sequelize;
const Message = require("../../src/db/models").Message;


describe("routes: message", () => {
    beforeEach((done) => {
        this.message;

        sequelize.sync({force: true}).then((res) => {
            Message.create({
                name: "Test test",
                message: "This is test message"
            })
            .then((message) => {
                this.message = message;
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("POST /create", () => {
        it("should create a new message", (done) => {
            const options = {
                url: `${base}create`,
                form: {
                    name: "Arata Kagan",
                    message: "This is test"
                }
            };

            request.post(options, 
                (err, res, body) => {
                    Message.findOne({where: {message: "This is test"}})
                    .then((message) => {
                        expect(message).toBeNull("This is test");
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });
    });

    describe("POST /destroy", () => {
        it("should delete the message", (done) => {
            Message.all()
            .then((messages) => {
                const messageCountBeforeDelete = messages.length;
                expect(messageCountBeforeDelete).toBe(1);

                request.post(
                    `${base}${this.message.id}/destroy`,
                    (err, res, body) => {
                        expect(res.statusCode).toBe(302);
                        Message.all()
                        .then((messages) => {
                            expect(err).toBeNull();
                            expect(messages.length).toBe(messageCountBeforeDelete - 1);
                            done();
                        })
                    });
              })
        });
    });
});