import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/Empleado';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription!: Subscription;
  empleado: Empleado | undefined;
  idEmpleado = 0;

  constructor(formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private toastr: ToastrService) {
    this.form = formBuilder.group({
      id: 0,
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      tipoDeDocumento: ['', [Validators.required]],
      numeroDeDocumento: ['', [Validators.required]],
      area: ['', [Validators.required]],
      subArea: ['', [Validators.required]]
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.empleadoService.obtenerEmpleado$().subscribe(data => {
      console.log(data);
      this.empleado = data;
      this.form.patchValue({
        nombre: this.empleado.nombre,
        apellido: this.empleado.apellido,
        tipoDeDocumento: this.empleado.tipoDeDocumento,
        numeroDeDocumento: this.empleado.numeroDeDocumento,
        area: this.empleado.area,
        subArea: this.empleado.subArea
      });
      this.idEmpleado = Number(this.empleado.id);
    });

  }

  guardarEmpleado() {
    if (Number(this.idEmpleado) == Number(this.empleado?.id)) {
      this.editar();
    }
    else {
      this.agregar();
    }
  }
  editar() {
    const empleado: Empleado = {
      id: this.empleado?.id,
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      tipoDeDocumento: this.form.get('tipoDeDocumento')?.value,
      numeroDeDocumento: this.form.get('numeroDeDocumento')?.value,
      area: this.form.get('area')?.value,
      subArea: this.form.get('subArea')?.value
    }
    this.empleadoService.actualizarEmpleado(this.idEmpleado, empleado).subscribe(data => {
      this.toastr.info("Registro actualizado", "El empleado a sido actualizado")
      this.empleadoService.obtenerEmpleado()
      this.form.reset();
      this.idEmpleado = 0;
    });
  }
  agregar() {
    const empleado: Empleado = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      tipoDeDocumento: this.form.get('tipoDeDocumento')?.value,
      numeroDeDocumento: this.form.get('numeroDeDocumento')?.value,
      area: this.form.get('area')?.value,
      subArea: this.form.get('subArea')?.value
    }
    this.empleadoService.guardarEmpleado(empleado).subscribe(data => {
      this.toastr.success("Registro agregado", "El empleado a sido almacenado")
      this.empleadoService.obtenerEmpleado()
      this.form.reset();
    });
  }
}
