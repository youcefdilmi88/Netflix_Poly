const express = require("express");
const db = require('./db.js');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/users", async(req, res) => {
    //res.send([{ name: 'Youcef' }, { name: 'Sarah' }]);
    const data = await db.query("Select id, name, email, password from users");
    res.send(data.rows);
});
app.listen(5000, function(){
    console.log("Server started at http://localhost:5000");
});

