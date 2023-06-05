import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }


  getFieldError (field:string,fb:FormGroup): string | null {
    if (!fb.controls[field]) return null;
    const errors = fb.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
            return 'Este campo es requerido';
        case 'maxlength':
            return `Máximo ${errors['maxlength'].requiredLength} caracteres.`;
        case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
            return `El valor mínimo es ${errors['min']}`;
        case 'max':
            return `El valor máximo es ${errors['max']}`;
        case 'pattern':
            return `El formato no es válido`;
      }
    }
    return null;
  }

}
