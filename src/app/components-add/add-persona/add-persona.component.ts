import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/entities/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})
export class AddPersonaComponent implements OnInit {
  numero!:number
  personaForm!: FormGroup;

  persona = {
    nombre: '',
    apellido: '',
    edad: 0,
    acercade: '',
    ocupacion: '',
    email: '',
    imagen: '',
    banner: ''
  };

  constructor(private personaService: PersonaService, private readonly fb: FormBuilder, private route: ActivatedRoute) { }

  submitted = false;

  ngOnInit(): void {
    this.numero=this.route.snapshot.params['id'];
    if (this.numero== null){
      this.numero=1;
    }

    this.personaForm = this.initForm();
  }

  savePersona(): void {
    const persona = this.personaForm.value;
    this.personaService.createPersona(persona)
      .subscribe(
        () => {
          alert('persona creada con éxito');
          this.submitted = true;
        }, () => {
          alert('error al crear persona');
        });
  }

  newPersona(): void {
    this.submitted = false;
    this.personaForm = this.initForm();
    this.persona = {
      nombre: '',
      apellido: '',
      edad: 0,
      acercade: '',
      ocupacion: '',
      email: '',
      imagen: '',
      banner: ''
    };
  }


  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      acercade: ['', [Validators.required, Validators.minLength(10)]],
      ocupacion: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }
}
