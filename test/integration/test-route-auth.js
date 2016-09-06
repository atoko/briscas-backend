var supertest = require("supertest")
	,app =  require("../../es5/server")
	,assert = require("assert");

exports.anonymous_returns_token = function(done){
	supertest(app.default)
	.get("/auth/anonymous")
	.expect(200)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof response.text === "string");
		return done();
	});
};

exports.register_returns_token = function(done){
	let username = Date.now();
	supertest(app.default)
	.post("/auth/register")
	.send({username: username, password: "pass", confirm: "pass"})
	.expect(200)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof JSON.parse(response.text) === "object");
		return done();
	});
};

exports.register_duplicate_email = function(done){
	let username = Date.now();
	supertest(app.default)
	.post("/auth/register")
	.send({username: username, password: "pass", confirm: "pass"})
	.expect(200)
	.end(function(err, response){
		supertest(app.default)
		.post("/auth/register")
		.send({username: username, password: "pass", confirm: "pass"})
		.expect(403)
		.end(function(err, response){
			assert.ok(!err);
			assert.ok(typeof JSON.parse(response.text) === "object");
			return done();
		});
	});
};

exports.register_no_confirm = function(done){
	let username = Date.now();
	supertest(app.default)
	.post("/auth/register")
	.send({username: username, password: "pass", confirm: "p22"})
	.expect(403)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof JSON.parse(response.text) === "object");
		return done();
	});
};

exports.login_valid_returns_token = function(done){
	let username = Date.now();
	supertest(app.default)
	.post("/auth/register")
	.send({username: username, password: "pass", confirm: "pass"})
	.expect(200)
	.end(function(err, response){
		supertest(app.default)
		.post("/auth/login")
		.send({username: username, password: "pass"})
		.expect(200)
		.end(function(err, response){
			assert.ok(!err);
			assert.ok(typeof JSON.parse(response.text) === "object");
			return done();
		});
	});
};

exports.login_invalid_returns_403 = function(done){
	supertest(app.default)
	.post("/auth/login")
	.send({username: "gandalf", password: "dagrey"})
	.expect(403)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof JSON.parse(response.text) === "object");
		return done();
	});
};