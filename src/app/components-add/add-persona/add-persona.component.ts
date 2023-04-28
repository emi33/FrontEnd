import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})
export class AddPersonaComponent implements OnInit{
  persona={
    
    nombre: '',
    apellido: '',
    edad: 0,
    acercade:'',
    ocupacion:'',
    imagen:'',
    banner:''
  };

  constructor(private personaService: PersonaService){}
  
  submitted = false;

  ngOnInit(): void {

  }

  savePersona():void {
    const data = {
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      edad: this.persona.edad,
      acercade: this.persona.acercade,
      ocupacion: this.persona.ocupacion,
      imagen: this.persona.imagen,
      banner: this.persona.banner
    };
    this.personaService.createPersona(data)
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
    this.persona = {
      
    nombre: '',
    apellido: '',
    edad: 0,
    acercade:'',
    ocupacion:'',
    imagen:'',
    banner:''
    }
  }
}
