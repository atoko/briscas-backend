let read = function(req, res, next) {
	let id = req.identity.id();
	let options = {
		columns:[
			"member_id",
			"public"
		]
	};
	req.db.brisca.members.findOne({member_id: id}, options, (err, row) => {
		if (err) {
			res.status(400).json(err).flush();
			return;
		}

		if (row) {
			res.json(row).flush();
		} else {
			req.db.brisca.members.insert({
				member_id: id,
				public: {}
			}, (err, row) => {
				if (err) {
					res.status(400).json(err).flush();
					return;
				}
				res.json(row).flush();
			});
		}
	});
};
let update = function(req, res) {
	let member = req.body;

	req.db.brisca.members.save(member, (err, row) => {
		if (err) {
			res.status(400).json(err).flush();
			return;
		}
		
		res.json(row).flush();
	});
};

export default {read, update};