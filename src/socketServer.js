import socketIO from "socket.io";
import { database } from "./configure";
import massive from "massive";
import { fromDatabase as briscaFromDatabase } from "./routes/game/find";
export default function(server) {
	const massiveDb =  massive.connectSync({connectionString : database.connection_string});
	const appSockets = socketIO(server).of("/brisca");
	const briscaSockets = {};

	appSockets.on("connection", function(socket) {
		socket.on("subscribe", function (userData) {
			let { briscaId, playerId } = userData
				,room = `brisca-app_${briscaId}_${playerId}`;
			socket.join(room);
			socket.briscaId = briscaId;
			socket.playerId = playerId;
			socket.room = room;

			if(!briscaSockets[briscaId]) {
				briscaSockets[briscaId] = [];
			}
			briscaSockets[briscaId].push(socket);
			
		});
		socket.on("disconnect", function () {
			const briscaId = socket.briscaId;
			let gameSockets = briscaSockets[briscaId];
			gameSockets.splice(gameSockets.indexOf(socket), 1);
			if (gameSockets.length <= 0) {
				briscaSockets[briscaId] = null;
				delete briscaSockets[briscaId];
			}
			socket.leave(socket.room);
		});
	});

	//should be more reactive, instead of sending updates to everyone
	//pass callback to request, to call emitter
	setInterval(function() {
		for(var socketId in appSockets.sockets) {
			let socket = appSockets.sockets[socketId];
			if (socket.room) {
				briscaFromDatabase(massiveDb, socket.briscaId, socket.playerId, (game) => {
					appSockets.to(socket.room).emit("update", game);
				});
			}
		}
	}, 3000);

	return function(req, res, next) {
		req.briscaSockets = briscaSockets;
		next();
	};
}