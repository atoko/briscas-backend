var supertest = require("supertest")
	,app =  require("../../es5/server")
	,assert = require("assert");

/*
exports.list_queryable = function(done){
	supertest(app.default)
	.get("/game/list")
	.expect(200)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof JSON.parse(response.text) === "object");
		return done();
	});
};
*/
exports.self_returns_game = function(done){
	supertest(app.default)
	.get("/game/new")
	.expect(200)
	.end(function(err, response){
		assert.ok(!err);
		let game = JSON.parse(response.text);
		assert.ok(game.success);

		supertest(app.default)
		.get("/game/" + game.brisca_id + "/self")
		.expect(200)
		.end(function(err, response){
			assert.ok(!err);
			assert.ok(typeof JSON.parse(response.text) === "object");
			return done();
		});	
	});
};

exports.new_returns_id = function(done){
	supertest(app.default)
	.get("/game/new")
	.expect(200)
	.end(function(err, response){
		assert.ok(!err);
		assert.ok(typeof response.text === "object");
		return done();
	});
};
