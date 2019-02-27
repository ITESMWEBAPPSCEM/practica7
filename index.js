const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('practica7.db');

function insertarAlumnos(nombre, matricula, carrera, fechaNacimiento, pasaTiempo, calificacionEsperada) {
    db.serialize(params => {
        var stmt = db.prepare("INSERT INTO Main VALUES(?, ?, ?, ?, ?, ?)");
        stmt.run(matricula, nombre, carrera, fechaNacimiento, pasaTiempo, calificacionEsperada);
        stmt.finalize();
    });
    db.close();
}

function consultarAlumnos() {
    db.each("SELECT * FROM Main", (err, row) => {
        
        err ? console.error(err): console.log(`${row.matricula} - ${row.nombre} - ${row.carrera}`);
        
    });
}

insertarAlumnos("Arturo Amador",01374406,"ISC",28,"Dormir","100");
consultarAlumnos();