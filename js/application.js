// LISTA DE TAREAS
var tasksList = [
    new Task(1, "Tarea Primera", "Una tarea agregada de prueba", "Patricio Rodriguez", "2019-10-11", "En Proceso"),
    new Task(2, "Tarea Segunda", "Una tarea agregada de prueba", "Javier Zolotarchuk", "2019-10-11", "Planeada"),
    new Task(3, "Tarea Tercera", "Una tarea agregada de prueba","Agustin DAngelo",  "2019-10-11", "Terminada"),
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
                $("#tabla-tareas #"+task.id).append("<td class='acciones-tarea'></td>");
                $("#tabla-tareas #"+task.id+" .acciones-tarea").append("<button type='button' class='editar-tarea btn btn-primary' id='"+task.id+"'>Editar</button>");
                $("#tabla-tareas #"+task.id+" .acciones-tarea").append("<button type='button' class='eliminar-tarea btn btn-danger' id='"+task.id+"'>Eliminar</button>");
                $("#tabla-tareas #"+task.id+" .acciones-tarea").append("<button type='button' class='finalizar-tarea btn btn-success' id='"+task.id+"'>Finalizar</button>");
    });
}

////////////////////////////////////////* GESTION DE TAREAS *////////////////////////////////////////

// AGREGAR NUEVA TAREA
function agregarNuevaTarea(id, nombre, descripcion, responsable, vencimiento, estado){
    tasksList.push(
        new Task(id, nombre, descripcion, responsable, vencimiento, estado)
    );
    construirlistaTareas();
    reiniciarFormularioCargaTarea();
}

// ELIMINAR UNA TAREA
function eliminarTarea(id){
    tasksList.splice(id, 1);
    construirlistaTareas();
}
// FINALIZAR UNA TAREA
function finalizarTarea(id){
    tasksList[id].estado = "Terminada";
    construirlistaTareas();
}
// EDITAR INFORMACION DE UNA TAREA
function editarTarea(id, nombre, descripcion, responsable, vencimiento, estado){
    tasksList[id-1].nombre = nombre;
    tasksList[id-1].descripcion = descripcion;
    tasksList[id-1].responsable = responsable;
    tasksList[id-1].vencimiento = vencimiento;
    tasksList[id-1].estado = estado;
    construirlistaTareas();
    reiniciarFormularioCargaTarea();
}

// REINICIAR FORMULARIO DE CARGA DE TAREA
function reiniciarFormularioCargaTarea(){
    $("#id-nueva-tarea").val('');
    $("#nombre-nueva-tarea").val('');
    $("#descripcion-nueva-tarea").val('');
    $("#responsable-nueva-tarea").val('');
    $("#vencimiento-nueva-tarea").val('');
    $("#estado-nueva-tarea").val('');
}

// ABRIR EDITOR DE TAREA
function abrirEditorDeTarea(id){
    //Cargo campos del formulario con los datos de la tarea a abrir
    $("#id-nueva-tarea").val(tasksList[id].id);
    $("#nombre-nueva-tarea").val(tasksList[id].nombre);
    $("#descripcion-nueva-tarea").val(tasksList[id].descripcion);
    $("#responsable-nueva-tarea").val(tasksList[id].responsable);
    $("#vencimiento-nueva-tarea").val(tasksList[id].vencimiento);
    $("#estado-nueva-tarea").val(tasksList[id].estado);

    //abro el formulario
    $("#modal-cargar-tarea").modal('toggle');
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
    reiniciarFormularioCargaTarea();
    $("#boton-actualizar-tarea").hide();
    $("#boton-crear-tarea").show();
    $("#modal-cargar-tarea").modal('toggle');
})

// BOTON DE ACTUALIZAR TAREA
$(document).on("click",".acciones-tarea .editar-tarea", function(e) { 
    $("#boton-actualizar-tarea").show();
    $("#boton-crear-tarea").hide();
    abrirEditorDeTarea($(e.target).attr('id')-1);
  });

// BOTON DE FINALIZAR TAREA
$(document).on("click",".acciones-tarea .finalizar-tarea", function(e) { 
    finalizarTarea($(e.target).attr('id')-1);
  });

// BOTON DE ELIMINAR TAREA
$(document).on("click",".acciones-tarea .eliminar-tarea", function(e) { 
    eliminarTarea($(e.target).attr('id')-1);
  });

////////////////////////////////////////* COMPORTAMIENTO DE MODALES *////////////////////////////////////////

// BOTON CREAR TAREA
$("#boton-crear-tarea").click( function(){
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

// BOTON ACTUALIZAR TAREA
$("#boton-actualizar-tarea").click( function(){
    if( 
        $("#nombre-nueva-tarea").val() == "" ||
        $("#descripcion-nueva-tarea").val() == "" ||
        $("#responsable-nueva-tarea").val() == "" ||
        $("#vencimiento-nueva-tarea").val() == ""  ||
        $("#estado-nueva-tarea").val() == "") 
        {
        $("#error-carga-tarea").show();
    }else{
        editarTarea($("#id-nueva-tarea").val(), 
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

