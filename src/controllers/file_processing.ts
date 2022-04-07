const Pool = require("pg").Pool;
const Json2csvParser = require("json2csv").Parser;
import fs from "fs";
require("dotenv").config();
// Create a connection to the database
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
// open the PostgreSQL connection
pool.connect((err: any, client: any, done: any) => {
  if (err) throw err;
  client.query("SELECT * FROM candidates", (err: any, res: any) => {
    done();
    if (err) {
      console.log(err.stack);
    } else {
      const jsonData = JSON.parse(JSON.stringify(res.rows));
      const json2csvParser = new Json2csvParser({ header: true });
      const csv = json2csvParser.parse(jsonData);
      fs.writeFile("testing_json_to_csv.csv", csv, function(error) {
        if (error) throw error;
        console.log("success!");
      });
    }
  });
});