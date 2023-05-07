import { Component, Input, OnInit } from '@angular/core';
import { Contacto } from 'src/app/entities/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit{
  socials!: Contacto[];
  @Input() id: number=1;

  constructor(private contactoService: ContactoService){  }
  ngOnInit(): void {
    this.retrieveContacto(this.id);
  }

  contactos(red:string){
    return "red"
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
        data =>{
          alert("Contacto eliminado correctamente " + data)
          this.retrieveContacto(this.id);
        }, err =>{
          alert("no se pudo eliminar el contacto " + err)
        })
    }}
}
