import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
	db,
	session,
	identity,
	cors
} from "./middleware"; //, auth, logging
import {
	game,
	auth
} from "./routes"; //, turn, self

var app = express();
app.set("port", (process.env.PORT || 5000));

app.use(cookieParser("lembas"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cors());
app.use(db());
app.use(session());
app.use(identity.inject());

app.post("/game", identity.require, game.createNew);
//app.get("/games");
app.all("/game/:id", game.find);
app.all("/game/:id/*", game.find);
app.get("/game/:id/", game.self);
app.post("/game/:id/", identity.require, game.join);
app.post("/game/:id/:card", identity.require, game.play);

app.get("/auth", identity.require, auth.get);
app.post("/auth/anonymous", auth.anonymous);
app.post("/auth/login", auth.login);
app.post("/auth/register", auth.register);

app.listen(app.get("port"), function() {
	console.log("briscas-backend running at port:" + app.get("port"));
});
export default app;