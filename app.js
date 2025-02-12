const express = require("express");
const mysql = require("mysql")
const app = express();


app.connectDatabase = () => {  
  con = mysql.createConnection({
    host: "localhost",
    port: "3800",
    user: "developer",
    password: "password",
    database: "test",
    multipleStatements: true
  });
  con.connect((err) => {
    if (err) throw err;          
  });
  return con;
}

app.con = app.connectDatabase()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hola Mundo!" });
});

app.get("/personas", (req, res) => {
  var sql = "SELECT * FROM personas";    
  con.query(sql, (err, result) => {      
    if (err) throw err;            
    res.status(200).json({ message: result});          
  }); 
})
  
module.exports = app;
