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

app.get("/api/get", (req, res) => {
    const selectDB = "select * from contact_db";
    db.query(selectDB, (err, result)=>{
        res.send(result);
    })
})

app.get("/", (req, res) => {
    /*const insertDB = "INSERT INTO contact_db (name, email, contact) VALUES ('luciana', 'luciana@cls.com', '9293949596')";
    db.query(insertDB, (err, result) => {
        console.log("erro", err);
        console.log("result", result)
        })*/
   res.send("Hello Express")
})

app.post("/api/post", (req, res)=>{
    const {name, email, contact} = req.body;
    const insertDB = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(insertDB, [name, email, contact], (error)=>{
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res)=>{
    const {id} = req.params;
    const removeDB = "delete from contact_db where id = ?";
    db.query(removeDB, id, (error)=>{
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const selectUpdateDB = "select * from contact_db where id = ?";
    db.query(selectUpdateDB, id,  (err, result)=>{
        if (err){
            console.log(err);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const updateDB = "update contact_db SET name = ?, email = ?, contact = ? where id = ?";
    db.query(updateDB, [name, email, contact, id],  (err, result)=>{
        if (err){
            console.log(err);
        }
        res.send(result);
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000")
});