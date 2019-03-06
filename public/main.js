const apiurl = 'http://localhost:3000/'


function registrarAlumno(params) {
    $.ajax({
        url: apiurl + 'alumnos',
        type: 'GET',
        success: function (params) {
            console.log(params);
            let data = params.data;
            var html = '';
            var contador = 1;
            Object.keys(data).forEach(idx => {
                console.log(data[idx]);
                html += '<tr>'
                html += '<th scope="row">'+contador+'</th>'
                html += '<td>'+data[idx].nombre+'</td>'
                html += '<td>'+data[idx].matricula+'</td>'
                html += '<td>'+data[idx].carrera+'</td>'
                html += '<td>'+data[idx].fechaNacimiento+'</td>'
                html += '<td>'+data[idx].pasaTiempo+'</td>'
                html += '<td>'+data[idx].calificacionEsperada+'</td>'
                html += '</tr>'
                contador++;
            });

            $('#tableData').html(html);
        },
        error: function (e) {
            console.error(e);
            console.error(e.message);
            console.error(e.code);
        }
    });
}

function register(params, event) {
    event.preventDefault();
    $(params).prop( "disabled", true );

    let name = $('#nombre').val()
    let id = $('#matricula').val()
    let major = $('#major').val()
    let born = $('#born').val()
    let hobby = $('#hobby').val()
    let grade = $('#grade').val()

    if (name === '' && id === "" && major === '' && hobby === '' && grade === "") {
        alert('Faltan elementos del formulario')
        $(params).prop( "disabled", false );
        return;
    }else{
        console.log('campos llenos');
        let dateTime = new Date(born);
        let mileseconds = dateTime.getTime();
        console.log(dateTime);
        console.log(mileseconds);
        

        $.ajax({
            url: apiurl + 'registroAlumno',
            type: 'POST',
            data:{
                nombre:name,
                matricula:id,
                carrera:major,
                fechaNacimiento:mileseconds,
                pasaTiempo:hobby,
                calificacionEsperada:grade
            },
            success: function (params) {
                console.log(params);
                document.location.href = 'index.html'
            },
            error: function (e) {
                console.error(e);
                console.error(e.message);
                console.error(e.code);
            }
        });
    }

   

}

registrarAlumno();
