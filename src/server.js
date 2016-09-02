import express from "express";
import { db } from "./middleware"; //, auth, logging
import { createNew } from "./routes"; //, turn, self
var app = express();
app.set("port", (process.env.PORT || 5000));

app.use(db);
app.get("/new", createNew);
//app.get("/list")
//app.get("/:id/self", self);
//app.get("/:id/turn", turn);

app.listen(app.get("port"), function() {
	console.log("briscas-backend running at port:" + app.get("port"));
});
export default app;