import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/entities/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit{
  @Input() id: number=1;
  currentPersona: Persona = {
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
constructor (private personaService: PersonaService){}

  ngOnInit(): void {
    this.personaService.getPersona(this.id)
      .subscribe({
        next: (data) => {
          this.currentPersona = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
