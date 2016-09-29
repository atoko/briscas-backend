import socketIO from "socket.io";
import { database } from "./configure";
import massive from "massive";
import { fromDatabase as briscaFromDatabase } from "./routes/game/find";
export default function(server) {
	const massiveDb =  massive.connectSync({connectionString : database.connection_string});	
	const appSockets = socketIO(server).of("/brisca");
	appSockets.on("connection", function(socket) {
		socket.on("subscribe", function (userData) {
			let { briscaId, playerId } = userData
				,room = `brisca-app_${briscaId}_${playerId}`;
			socket.join(room);
			socket.briscaId = briscaId;
			socket.playerId = playerId;
			socket.room = room;
		});
		socket.on("disconnect", function () {
			socket.leave(socket.room);
		});
	});

	let sendUpdate = function() {
		
	}
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
}