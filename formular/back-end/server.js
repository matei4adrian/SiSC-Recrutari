const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

//Initializing server
const app = express();
app.use(bodyParser.json());
const port = 8080;
app.listen(port, () => {
  console.log("Server online on: " + port);
});
app.use("/", express.static("../front-end"));
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inscrieri_expozitia_actualitARTE"
});
connection.connect(function(err) {
  console.log("Connected to database!");
  const sql =
    "CREATE TABLE IF NOT EXISTS participanti(nume VARCHAR(255),prenume VARCHAR(255),email VARCHAR(255),ocupatie VARCHAR(255),prezenta_zile VARCHAR(255),invitat_preferat INTEGER)";
  connection.query(sql, function(err, result) {
    if (err) throw err;
  });
});
app.post("/inscriere", (req, res) => {
    const participant ={
        nume: req.body.nume,
        prenume: req.body.prenume,
        email: req.body.email,
        ocupatie: req.body.ocupatie,
        prezenta_zile: req.body.prezenta_zile,
        invitat_preferat: req.body.invitat_preferat,
    }
  let error = [];

  if (!participant.nume||!participant.prenume||!participant.email||!participant.ocupatie||!participant.prezenta_zile||!participant.invitat_preferat) {
    error.push("Unul sau mai multe campuri nu au fost introduse");
    console.log("Unul sau mai multe campuri nu au fost introduse!");
  } else {
    if (participant.nume.length < 2 && participant.nume.length > 30) {
      console.log("Nume invalid!");
      error.push("Nume invalid");
    } else if (!participant.nume.match("^[A-Za-z]+$")) {
      console.log("Numele trebuie sa contina doar litere!");
      error.push("Numele trebuie sa contina doar litere!");
    }
    if (participant.prenume.length < 2 || participant.prenume.length > 30) {
      console.log("Prenume invalid!");
      error.push("Prenume invalid!");
    } else if (!participant.prenume.match("^[A-Za-z]+$")) {
      console.log("Prenumele trebuie sa contina doar litere!");
      error.push("Prenumele trebuie sa contina doar litere!");
    }
    if (!participant.email.includes("@gmail.com") && !participant.email.includes("@yahoo.com")) {
      console.log("Email invalid!");
      error.push("Email invalid!");
    }
 
    
    if (student.telefon.length != 10) {
      console.log("Numarul de telefon trebuie sa fie de 10 cifre!");
      error.push("Numarul de telefon trebuie sa fie de 10 cifre!");
    } else if (!student.telefon.match("^[0-9]+$")) {
      console.log("Numarul de telefon trebuie sa contina doar cifre!");
      error.push("Numarul de telefon trebuie sa contina doar cifre!");
    }
    if(!student.facultate.match("^[A-Za-z]+$")) {
        console.log("Denumirea facultatii trebuie sa contina doar litere!");
        error.push("Denumirea facultatii trebuie sa contina doar litere!");
    }
    if(!student.specializare.match("^[A-Za-z]+$")) {
        console.log("Denumirea specializarii trebuie sa contina doar litere!");
        error.push("Denumirea specializarii trebuie sa contina doar litere!");
    }

    const serii = ['A','B','C','D','E','F'];
    let ok = false;
    serii.forEach(serie => {
        if(student.serie === serie) {
            ok = true;
        }
    })
    if(!ok) {
        console.log("Seria introdusa nu se regaseste in aceasta facultate!");
        error.push("Seria introdusa nu se regaseste in aceasta facultate!");
    }
    if (parseInt(student.grupa) === "NaN") {
      console.log("Grupa trebuie sa contina doar cifre!");
      error.push("Grupa trebuie sa contine doar cifre!");
    } 
    if(parseInt(student.an_inceput) === "NaN") {
        console.log("Anul nu poate contine litere!");
        error.push("Anul nu poate contine litere!");
    }
    if(student.an_inceput != new Date().getFullYear()) {
        console.log("Anul nu este valid!");
        error.push("Anul nu este valid!");
    }
    if(student.taxa_inscriere != 2000) {
        console.log("Taxa de inscriere incorecta.");
        error.push("Taxa de inscriere incorecta.");
    }
  }
  if (error.length === 0) {
    const sql =
      `INSERT INTO participanti(nume,prenume,email,ocupatie,prezenta_zile,invitat_preferat) VALUES (?,?,?,?,?,?)`;
    connection.query(sql,
        [
        participant.nume, 
        participant.prenume, 
        participant.email, 
        participant.ocupatie, 
        participant.prezenta_zile, 
        participant.invitat_preferat, 
        ],
        function(err, result) {
            if (err) throw err;
            console.log("V-ati inscris cu succes!");
            res.status(200).send({
                message: "Participant inscris in baza de date!"
            });
        console.log(sql);
    });
  } else {
    res.status(500).send(error);
    console.log("Eroare la inserarea in baza de date!");
  }

});
