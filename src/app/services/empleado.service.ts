import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  myAppUrl = 'https://empleado20210214230831.azurewebsites.net/';
  myApiUrl = 'api/empleado/';
  list: Empleado[] | undefined;
  private actualizarFormulario = new BehaviorSubject<Empleado>({} as any)
  constructor( private http: HttpClient) { }

  guardarEmpleado(empleado: Empleado): Observable<Empleado>
  {
    return this.http.post<Empleado>(this.myAppUrl + this.myApiUrl, empleado); 
  }
  eliminarEmpleado(id:number): Observable<Empleado>{
    return this.http.delete<Empleado> (this.myAppUrl + this.myApiUrl + id);
  }
  obtenerEmpleado(){
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
                  .then(data=>{
                    this.list = data as Empleado[];
                  });
  }
  actualizarEmpleado(id: number, empleado: Empleado) :Observable<Empleado> {
    return this.http.put<Empleado>(this.myAppUrl + this.myApiUrl + id, empleado)
  }

  actualizar(empleado :Empleado) {
    this.actualizarFormulario.next(empleado);
  }
  obtenerEmpleado$(): Observable<Empleado>{
    return this.actualizarFormulario.asObservable();
  }
}
