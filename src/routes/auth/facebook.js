import fetch from "node-fetch";

let facebook = function(req, res, next) {
	if (typeof req.body === "object") {
		let { username, password, provider } = req.body;
		if (provider && provider === "facebook") {
			fetch(`https://graph.facebook.com/me?access_token=${password}`)
				.then((response) => {
					return response.json();
				})
				.then((json) => {
					let {error, id} = json;
					
					if (error) {
						res.sendStatus(403);
						return;
					}

					if (id) {
						username = username + "^facebook";
						req.db.membership.register(username, id, id, function(err, row) {
							if (err) {
								res.status(403).json(err).flush();
								return;
							} else {
								req.db.membership.authenticate(username, id, "local", "127.0.0.1",
									function(err, row) {
										if (err) {
											res.status(403).json(err).flush();
											return;
										} else {
											let response = row[0].authenticate;
											if (response.success === false) {
												res.status(403).json(response).flush();
												return;
											}
											req.identity.persist(response.return_id);
											res.json(response).flush();
										}
									}
								);
							}
						});
					}
				});
		} else {
			next();
		}
	}

};
export default facebook;