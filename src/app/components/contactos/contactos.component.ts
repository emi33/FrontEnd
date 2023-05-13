import { Component, Input, OnInit } from '@angular/core';
import { Contacto } from 'src/app/entities/contacto';
import { Persona } from 'src/app/entities/persona';
import { ContactoService } from 'src/app/services/contacto.service';
import { PersonaService } from 'src/app/services/persona.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit{
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
  socials!: Contacto[];
  @Input() id: number=1;

  constructor(private contactoService: ContactoService, private personaService: PersonaService, public authService: AuthService){  }
  ngOnInit(): void {
    this.personaService.getPersona(this.id).subscribe(
      {
        next: (data) => {
          this.currentPersona = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    
    this.retrieveContacto(this.id);
  }

  
  retrieveContacto(personaid: number): void {
    this.contactoService.getContactoList(personaid)
      .subscribe({
        next: (data) => {
          this.socials = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  deleteContacto(id:number){
    if(id != undefined){
      this.contactoService.deleteContacto(id).subscribe(
        () =>{
          alert("Contacto eliminado correctamente")
          this.retrieveContacto(this.id);
        }, () =>{
          alert("no se pudo eliminar el contacto ")
        })
    }}
}
