import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/entities/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit{
  
  @Input() id: number=1;
  @Input() currentPersona: Persona = {
    id:0,
    nombre: '',
    apellido: '',
    edad: 0,
    acercade:'',
    ocupacion:'',
    email:'',
    imagen:'',
    banner:'',
  };
  
  constructor(
    private personaService: PersonaService,
    public authService: AuthService,
   ) { }

  ngOnInit(): void {
   
      this.getPersona(this.id);
    
  }

  getPersona(personaid: number): void {
    this.personaService.getPersona(personaid)
      .subscribe({
        next: (data) => {
          this.currentPersona = data ;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  
}
