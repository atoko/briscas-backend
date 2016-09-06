let anonymous = function(req, res, next) {
	let anon = req.sessionID.slice(0, 8);

	req.db.membership.register(anon, anon, anon, function(err, row) {
		if (err) {
			res.status(403).json(err);
			res.send();
			return;
		}
		else {
			let response = row[0].register;
			if (response.success === false) {
				res.status(403).json(response);
				return;
			}
			
			let s = req.session;
			s.data = s.data ? s.data : {};
			s.data["player_id"] = response.new_id;
			s.save();			
			res.json(response).send();
		}	
	});
};
export default anonymous;