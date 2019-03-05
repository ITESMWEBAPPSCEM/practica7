const express = require('express');
const app = express();
const Joi = require('joi');
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('practica7.db');


app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.json());


function insertarAlumnos(nombre, matricula, carrera, fechaNacimiento, pasaTiempo, calificacionEsperada) {
    db.serialize(params => {
        var stmt = db.prepare("INSERT INTO Main VALUES(?, ?, ?, ?, ?, ?)");
        stmt.run(nombre, matricula, carrera, fechaNacimiento, pasaTiempo, calificacionEsperada);
        stmt.finalize();
    });
    db.close();
}

function consultarAlumnos() {
    var data = {}
    db.each("SELECT * FROM Main", (err, row) => {
        data = {
                "nombre":row.Nombre,
                "matricula":row.Matricula,
                "carrera":row.Carrera,
                "fechaNacimiento":row.FechaNacimiento,
                "pasaTiempo":row.Pasatiempo,
                "calificacion":row.CalificacionEsperada
            }

        if (err) {
            console.error(err)
            return null
        }else{
            console.log(data);
            return data
        }

    });

    setTimeout(() => {
        return data;
    }, 1500);
}

app.get('/alumnos', (req, res) => {

    var data = {}
    db.each("SELECT * FROM Main", (err, row) => {
        data = {
                "nombre":row.Nombre,
                "matricula":row.Matricula,
                "carrera":row.Carrera,
                "fechaNacimiento":row.FechaNacimiento,
                "pasaTiempo":row.Pasatiempo,
                "calificacion":row.CalificacionEsperada
            }
        if (err) {
            console.error(err)
            res.status(501).send({status:true, data:data});
            return;
        }

    });
    setTimeout(() => {
        console.log(data);
        res.send({status:true, data:data});
        return;
        
    }, 5000);
    
});

app.post('/registroAlumno',(req,res)=>{

    var nombre = req.body.nombre
    var matricula = req.body.matricula
    var carrera = req.body.carrera
    var fechaNacimiento = req.body.fechaNacimiento
    var pasaTiempo = req.body.pasaTiempo
    var calificacionEsperada = req.body.calificacionEsperada


    insertarAlumnos(nombre, matricula, carrera, fechaNacimiento, pasaTiempo, calificacionEsperada)

    setTimeout(() => {
        res.send({status:true});
        return;
    }, 5000);
    
})




//insertarAlumnos("Arturo Amador",01374416,"ISC",28,"Dormir","100");
console.log(consultarAlumnos());

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));