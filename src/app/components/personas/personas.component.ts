import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/entities/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit{
  persona?: Persona[];
  currentPersona: Persona = {
  
    nombre: '',
    apellido: '',
    edad: 0
  };
  currentIndex = -1;
  title = '';

  constructor(private personaService: PersonaService, private router: Router) { }
  ngOnInit(): void {
    this.retrievePersona();
  }

  retrievePersona(): void {
    this.personaService.getPersonaList()
      .subscribe({
        next: (data) => {
          this.persona = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrievePersona();
    this.currentPersona = {
      
      nombre: '',
      apellido: '',
      edad: 0
    };
    this.currentIndex = -1;
  }

  setActivePersona(persona: Persona, index: number): void {
    this.currentPersona = persona;
    this.currentIndex = index;
  }

  
}
