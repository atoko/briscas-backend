class Identity {
	constructor(req) {
		this.req = req;
	}
	id() {
		if (this.req.session && this.req.session.data) {
			return this.req.session.data["user_id"];
		} else
		{
			return "null";
		}
	}
	persist(id) {
		let s = this.req.session;
		s.data = s.data ? s.data : {};
		s.data["user_id"] = id;
		s.save();		
	}
}

let injectIdentity = function() {
	return function(req, res, next) {
		req.identity = new Identity(req);
		next();
	};
};

let requireIdentity = function(req, res, next) {
	if (req.identity.id() === null) {
		res.sendStatus(402).end();
	} else {
		next();
	}
};
export default injectIdentity;