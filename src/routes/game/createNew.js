import brisca from "../../lib/brisca";

let createNew = function(req, res, next) {
	let b = brisca.tableFor(2);
	b.join();
	b.join();
	debugger;	
	res.json({
		success: true,
		//brisca_id: b.brisca_id;	
	});
};
export default createNew;