const express = require('express');
const app = express();
const Joi = require('joi');
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('practica7.db');


app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.set('view engine', 'ejs');



function insertarAlumnos(nombre, matricula, carrera, fechaNacimiento, pasaTiempo, calificacionEsperada) {
    db.serialize(params => {
        var stmt = db.prepare("INSERT INTO Main VALUES(?, ?, ?, ?, ?, ?)");
        stmt.run(nombre, matricula, carrera, fechaNacimiento, pasaTiempo, calificacionEsperada);
        stmt.finalize();
    });
}


app.get('/alumnos', (req, res) => {

    var data = {}
    var array = []
    db.all("SELECT * FROM Main ORDER BY FechaNacimiento DESC", [],(err, row) => {
        
        if (err) {
            console.error(err)
            res.status(501).send({status:true, data:array});
            return;
        }

        
        row.forEach(row=>{
            array.push({
                "nombre":row.Nombre,
                "matricula":row.Matricula,
                "carrera":row.Carrera,
                "fechaNacimiento":row.FechaNacimiento,
                "pasaTiempo":row.Pasatiempo,
                "calificacion":row.CalificacionEsperada
            })
        })

    });
    setTimeout(() => {
        console.log(data);
        res.send({status:true, data:array});
        return;
        
    }, 2500);
    
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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));