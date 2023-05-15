import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-add-educacion',
  templateUrl: './add-educacion.component.html',
  styleUrls: ['./add-educacion.component.css']
})
export class AddEducacionComponent implements OnInit {
  educacionForm!: FormGroup;
  numero!: number;
  educacion = {
    institucion: '',
    titulo: '',
    fechainicio: 0,
    fechafin: 0,
    personaid: 0
  };

  constructor(private educacionService: EducacionService, private router: Router, private route: ActivatedRoute, private readonly fb: FormBuilder) {

  }
  submitted = false;

  ngOnInit(): void {
    this.educacionForm = this.initForm();
    this.numero = this.route.snapshot.params['personaid'];
  }
  saveEducacion(): void {
    const educacion = this.educacionForm.getRawValue();
    educacion.personaid = this.numero;
    this.educacionService.createEducacion(educacion)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          alert('Educacion creada exitosamente');
        }, () => {
          alert('error al crear educacion');
        });
  }
  newEducacion(): void {
    this.submitted = false;
    this.educacionForm = this.initForm();
    this.educacion = {
      institucion: '',
      titulo: '',
      fechainicio: 0,
      fechafin: 0,
      personaid: 0

    }
  }
  initForm(): FormGroup {
    return this.fb.group({
      institucion: ['', [Validators.required, Validators.minLength(4)]],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      fechainicio: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechafin: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      personaid: ['']
    })
  }
}
