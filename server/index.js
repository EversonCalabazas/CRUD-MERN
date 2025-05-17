const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234567890",
    database: "crud_contact"
});

app.get("/", (req, res) => {
    const insertDB = "INSERT INTO contact_db (name, email, contact) VALUES ('luciana', 'luciana@cls.com', '9293949596')";
    db.query(insertDB, (err, result) => {
        console.log("erro", err);
        console.log("result", result)
        res.send("Hello Express")

    })
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
});