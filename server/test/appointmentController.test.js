var request = require("supertest");
var expect = require("chai").expect;
var app = require("../server.js");
var agent = request.agent(app);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var loginDetails = { Email: "poi@poi.com", Password: "poi" };
var addedId;

describe("Login", function() {
  this.timeout(10000);
  before(async function() {
    await sleep(4000);
  });

  after(() => {
    app.stop();
  });

  it("should login superadmin", done => {
    agent
      .post("/api/login")
      .send(loginDetails)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });

  describe("findAllAppointments in appointmentController", () => {
    // don't need do anything with cookies, agent will  attached cookies automatically based on login above
    let response;

    it("should be able to fetch appointment", done => {
      agent
        .get("/api/appointment")
        .query({ user: "5cd40e26c3249f3045ec5ff3" })
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          response = res;
          return done();
        });
    });

    it("should output the right format", done => {
      agent
        .get("/api/appointment")
        .query({ user: "5cd40e26c3249f3045ec5ff3" })
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).to.be.an("array");
          return done();
        });
    });
  });

  describe("add new appointment", () => {
    it("should be able to add appointment to db", done => {
      let appointment = {
        Time: Date.now(),
        Description: "req.body.Description",
        Address: "req.body.Address",
        Invitee: "5cd40e26c3249f3045ec5ff3",
        InviteeFirstName: "raol",
        InviteeLastName: "req.body.InviteeLastName",
        Creator: "5cd4271d1eb92a45f7f3e3d2",
        CreatorFirstName: "req.body.CreatorFirstName",
        CreatorLastName: "req.body.CreatorLastName",
        IsApproved: false,
      };

      let result = {
        Description: "req.body.Description",
        Address: "req.body.Address",
        Invitee: "5cd40e26c3249f3045ec5ff3",
        InviteeFirstName: "raol",
        InviteeLastName: "req.body.InviteeLastName",
        Creator: "5cd4271d1eb92a45f7f3e3d2",
        CreatorFirstName: "req.body.CreatorFirstName",
        CreatorLastName: "req.body.CreatorLastName",
        IsApproved: false,
      };

      agent
        .post("/api/appointment")
        .send(appointment)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          addedId = res.body._id;
          expect(res.body).to.be.include(result);
          done();
        });
    });

    it("db should contain newly added appointment", done => {
      agent
        .get("/api/appointment")
        .query({ user: "5cd40e26c3249f3045ec5ff3" })
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).to.be.an("array");
          expect(res.body.map(result => result._id)).to.include(addedId);
          done();
        });
    });
  });

  describe("update appointment", () => {
    it("should update the created appointment", done => {
      let appointment = {
        Address: "123",
      };

      agent
        .post(`/api/appointment/${addedId}`)
        .send(appointment)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).to.be.include({ UpdateSuccessful: true });
          done();
        });
    });

    it("should get have the update appointment in db", done => {
      let appointment = {
        Address: "123",
      };
      agent
        .get("/api/appointment")
        .query({ user: "5cd40e26c3249f3045ec5ff3" })
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).to.be.an("array");
          expect(res.body.map(result => result.Address)).to.include(
            appointment.Address
          );
          done();
        });
    });
  });

  describe("approve appointment", () => {
    it("should approve appointment", done => {
      agent
        .post(`/api/appointment/approve/${addedId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).to.be.include({ UpdateSuccessful: true });
          done();
        });
    });

    it("db contain approved appointment", done => {
      agent
        .get("/api/appointment")
        .query({ user: "5cd40e26c3249f3045ec5ff3" })
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).to.be.an("array");
          expect(res.body.filter(result => result.IsApproved).map(result => result._id)).to.include(addedId);
          done();
        });
    });
  });

  describe("delete appointment", () => {
    it("Should delete the created appointment", done => {
      agent
        .delete(`/api/appointment/${addedId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).to.include({ DeletionSuccessful: true });
          done();
        });
    });

    it("db should not have the deleted appointment", done => {
      agent
        .get("/api/appointment")
        .query({ user: "5cd40e26c3249f3045ec5ff3" })
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).to.be.an("array");
          expect(res.body.map(result => result._id)).to.not.include(addedId);
          done();
        });
    });
  });
});
