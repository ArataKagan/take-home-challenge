const sequelize = require("../../src/db/models/index").sequelize;
const Message = require("../../src/db/models").Message;

describe("Message", () => {
    beforeEach((done) => {
        this.message;
        sequelize.sync({force: true}).then((res) => {
            Message.create({
                name: "Test Kagan",
                message: "This is test"
            })
            .then((message) => {
                this.message = message;
                done();
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

    describe("create()", () => {
        it("should create a message object with a name and body", (done) => {
            Message.create({
                name: "Test Test",
                message: "This is second test"
            })
            .then((message) => {
                console.log(message);
                expect(message.name).toBe("Test Test");
                expect(message.message).toBe("This is second test");
                done();
            })
            .catch((err) => {
                console.log("there was an error creating a message");
                console.log(err);
                done();
            });
        });

        it("should not create a message without name", (done) => {
            Message.create({
                message: "This is a message without name"
            })
            .then((message) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Message.name cannot be null");
                done();
            })
        });

        it("should not create a message without message", (done) => {
            Message.create({
                name: "Test test"
            })
            .then((message) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Message.message cannot be null");
                done();
            })
        });
    });
})