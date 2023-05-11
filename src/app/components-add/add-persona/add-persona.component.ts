import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/entities/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})
export class AddPersonaComponent implements OnInit{
  personaForm!: FormGroup<any>;


  persona={
    
    nombre: '',
    apellido: '',
    edad: 0,
    acercade:'',
    ocupacion:'',
    imagen:'',
    banner:''
  };

  constructor(private personaService: PersonaService, private readonly fb: FormBuilder){}
  
  submitted = false;

  ngOnInit(): void {
    this.personaForm = this.initForm();
  }

  savePersona():void {
   
 
    const persona = this.personaForm.getRawValue();
    this.personaService.createPersona(persona)
    .subscribe(
      response => {
        console.log(response);
        this.submitted= true;
      }, error => {
        console.log(error);
      });
  }

  newPersona(): void {
    this.submitted=false;
    this.persona={
    
      nombre: '',
      apellido: '',
      edad: 0,
      acercade:'',
      ocupacion:'',
      imagen:'',
      banner:''
    };
  }


  initForm(): FormGroup{
 
  return this.fb.group({
    nombre:['', [Validators.required, Validators.minLength(3)]],
    apellido:['', [Validators.required, Validators.minLength(3)]],
    edad:['', Validators.required],
    acercade:['', [Validators.required, Validators.minLength(10)]],
    ocupacion:['', [Validators.required, Validators.minLength(4)]]
  })
  }
}
