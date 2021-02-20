import { Pipe, PipeTransform } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(empleadoService: any, arg: any): any {
    const resultPost = [];
    for (const empleado of empleadoService) {
      if ((String(empleado.nombre).toLowerCase().indexOf(arg.toLowerCase()) > -1) 
      || (empleado.numeroDeDocumento.indexOf(arg) > -1 )) {
        resultPost.push(empleado);
      }
    }
    return resultPost;
  }
}

