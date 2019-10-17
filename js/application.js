// LISTA DE TAREAS
var tasksList = [
    new Task(1, "Tarea Primera", "Una tarea agregada de prueba", "Patricio Rodriguez", "20/11/2019", "En Proceso"),
    new Task(2, "Tarea Segunda", "Una tarea agregada de prueba", "Javier Zolotarchuk", "20/11/2019", "En Proceso"),
    new Task(3, "Tarea Tercera", "Una tarea agregada de prueba","Agustin DAngelo",  "20/11/2019", "Planeada"),
    new Task(4, "Tarea Cuarta", "Una tarea agregada de prueba", "Patricio Rodriguez", "20/11/2019", "Terminada"),
    new Task(5, "Tarea Quinta", "Una tarea agregada de prueba", "Carla Varela Barreto", "20/11/2019", "Terminada"),
    new Task(6, "Tarea Sexta", "Una tarea agregada de prueba", "Patricio Rodriguez", "20/11/2019", "En Proceso")
];

////////////////////////////////////////* CONSTRUCCION DE APLICACION *////////////////////////////////////////


// CONSTRUCCION DE LA LISTA DE TAREAS
function construirlistaTareas(){

    //remover todos los viejos elementos

    $("#tabla-tareas").empty();

    //cargar todos los nuevos elementos

    tasksList.forEach( function(task){
        //crear nuevo Table Row
        $("#tabla-tareas").append("<tr id='"+task.id+"'>");
            // si estado = "Terminada" class='table-success'
            if ( task.estado == "Terminada") {
                $("#tabla-tareas #"+task.id).addClass("table-success");
            };
            // si estado = "En Proceso" class="table-primary"
            if ( task.estado == "En Proceso") {
                $("#tabla-tareas #"+task.id).addClass("table-primary");
            };
                //crear nuevo Td: ID
                $("#tabla-tareas #"+task.id).append("<th scope='row'>"+task.id+"</th>");
                // crear nuevo Td: nombre
                $("#tabla-tareas #"+task.id).append("<td>"+task.nombre+"</td>");
                // crear nuevo Td: descripcion
                $("#tabla-tareas #"+task.id).append("<td>"+task.descripcion+"</td>");
                // crear nuevo Td: responsable
                $("#tabla-tareas #"+task.id).append("<td>"+task.responsable+"</td>");
                // crear nuevo Td: vencimiento
                $("#tabla-tareas #"+task.id).append("<td>"+task.vencimiento+"</td>");
                // crear nuevo Td: estado
                $("#tabla-tareas #"+task.id).append("<td>"+task.estado+"</td>");
                // crear nuevo Td: ACCIONES
                $("#tabla-tareas #"+task.id).append("<td><img src='img/edit.png'> <img src='img/delete.png'></td>");
    });
}

// CONSTRUCCION DE ACCIONES PARA CADA TAREA
function construirAcciones(){

}

////////////////////////////////////////* GESTION DE TAREAS *////////////////////////////////////////

// AGREGAR NUEVA TAREA
function agregarNuevaTarea(id, nombre, descripcion, responsable, vencimiento, estado){
    tasksList.push(
        new Task(id, nombre, descripcion, responsable, vencimiento, estado)
    );
    construirlistaTareas();
    $('#modal-cargar-tarea').trigger("reset");
}

// ELIMINAR UNA TAREA
function eliminarTarea(id){
    tasksList.splice(id-1, 1);
}

// EDITAR INFORMACION DE UNA TAREA
function editarTarea(id, nombre, descripcion, responsable, vencimiento, estado){
    tasksList[id-1].nombre = nombre;
    tasksList[id-1].descripcion = descripcion;
    tasksList[id-1].responsable = responsable;
    tasksList[id-1].vencimiento = vencimiento;
    tasksList[id-1].estado = estado;
}

////////////////////////////////////////* COMPORTAMIENTO DE VENTANA PRINCIPAL *////////////////////////////////////////

// BOTON DE AYUDA
$("#Ayuda").click( function() {
    $("#modal-ayuda").modal('toggle');
})

// BOTON DE CONTACTO
$("#Contacto").click( function() {
    console.log("mensaje de click");
})

// BOTON DE NUEVA TAREA
$("#Nueva-tarea").click( function() {
    $("#modal-cargar-tarea").modal('toggle');
})

////////////////////////////////////////* COMPORTAMIENTO DE MODALES *////////////////////////////////////////

// BOTON CARGAR TAREA
$("#boton-cargar-tarea").click( function(){
    if( 
        $("#nombre-nueva-tarea").val() == "" ||
        $("#descripcion-nueva-tarea").val() == "" ||
        $("#responsable-nueva-tarea").val() == "" ||
        $("#vencimiento-nueva-tarea").val() == ""  ||
        $("#estado-nueva-tarea").val() == "") 
        {
        $("#error-carga-tarea").show();
    }else{
        agregarNuevaTarea(tasksList.length+1, 
                $("#nombre-nueva-tarea").val(), 
                $("#descripcion-nueva-tarea").val(),
                $("#responsable-nueva-tarea").val(),
                $("#vencimiento-nueva-tarea").val(),
                $("#estado-nueva-tarea").val()
                );
        $("#modal-cargar-tarea").modal('hide');
        $("#toast-nueva-tarea").toast('show');
        };
})


// BOTON CERRAR ALERTA CARGA TAREA
$("#cerrar-error-carga-tarea").click( function() {
    $("#error-carga-tarea").hide();
});

/////////////////////////////////////* INICIALIZACION DE LA APLICACION */////////////////////////////////////

$(document).ready( function() {
    construirlistaTareas();
})

