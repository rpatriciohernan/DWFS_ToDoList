var Task = function (id, nombre, descripcion, responsable, vencimiento, estado){
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.responsable = responsable;
    this.vencimiento = vencimiento;
    this.estado = estado;
}

 Task.prototype.constructor = Task;

