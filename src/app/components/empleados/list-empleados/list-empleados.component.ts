import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  constructor(public empleadoService: EmpleadoService,
              public toastr: ToastrService) { }
              filterPost = '';
              pageActual: number = 1;
  ngOnInit(): void {
    this.empleadoService.obtenerEmpleado();
  }


  eliminarEmpleado(empleado: Empleado){
    if(confirm("Esta seguro que desea eliminar el registro de la base de datos?")){
      this.empleadoService.eliminarEmpleado(Number(empleado.id)).subscribe(data =>{
        this.toastr.warning("Registro eliminado","El empleado a sido eliminado");
        this.empleadoService.obtenerEmpleado();
      })
    }
  }
  editarEmpleado( empleado: Empleado ){
    this.empleadoService.actualizar(empleado);
  }
  i: number = 0;
}
