import express from "express";
import http from "http";
import compression from "compression";
import path from "path";
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
import socketIO from "socket.io";

const app = express();
const server = http.Server(app);
const appSockets = socketIO(server);
appSockets.on('connection', function(socket) {
	console.log("connected");  
	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
  	});
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });	  
});
app.set("port", (process.env.PORT || 5000));

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "assets")));
app.use(cookieParser("lembas"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cors());
app.use(db());
app.use(session());
app.use(identity.inject());

app.post("/game", game.createNew);
//app.get("/games");
app.all("/game/:id", game.find);
app.all("/game/:id/*", game.find);
app.get("/game/:id/", game.self);
app.post("/game/:id/", game.join);
app.post("/game/:id/:card", game.play);

app.get("/auth", identity.require, auth.get);
app.get("/auth/logout", auth.logout);
app.post("/auth/anonymous", auth.anonymous);
app.post("/auth/login", auth.facebook);
app.post("/auth/login", auth.login);
app.post("/auth/register", auth.register);

app.all("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "assets", "index.html"));
});

server.listen(app.get("port"), function() {
	console.log("briscas-backend running at port:" + app.get("port"));
});
export default app;