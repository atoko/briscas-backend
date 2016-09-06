import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
	db,
	session
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

app.use(db());
app.use(session());
//app.use(identity());

app.get("/game/new", game.createNew);
//app.get("/game/list");
//app.get("/game/:id/self", self);
//app.get("/game/:id/turn", requireIdentity, turn);

app.get("/auth/anonymous", auth.anonymous);
app.post("/auth/login", auth.login);
app.post("/auth/register", auth.register);

app.listen(app.get("port"), function() {
	console.log("briscas-backend running at port:" + app.get("port"));
});
export default app;