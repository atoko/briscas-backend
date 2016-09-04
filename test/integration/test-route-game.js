var supertest = require("supertest")
	,app =  require("../../es5/server")
	,assert = require("assert");

/*
exports.list_queryable = function(done){
	supertest(app.default)
	.get("/new")
	.expect(200)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof JSON.parse(response.text) === "object");
		return done();
	});
};
*/
exports.new_returns_id = function(done){
	supertest(app.default)
	.get("/new")
	.expect(200)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof response.text === "string");
		return done();
	});
};

exports.self_returns_game = function(done){
	supertest(app.default)
	.get("/new")
	.expect(200)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof JSON.parse(response.text) === "object");
		return done();
	});
};
