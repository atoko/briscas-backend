import process from "process";
let database = {
	connection_string: "postgres://rxtsataaewzxoi:_kkuo2YFFJXYcxef0yz4EUeZfu@ec2-54-235-250-156.compute-1.amazonaws.com:5432/d21g3k5gclhnb6?ssl=true"
};

if (typeof process.env.DB_CONNECTION !== "undefined")
{
    database.connection_string = process.env.DB_CONNECTION;
}
if (typeof process.env.SNAP_DB_PG_URL_ALT !== "undefined")
{
    database.connection_string = process.env.SNAP_DB_PG_URL;
}

export { database };