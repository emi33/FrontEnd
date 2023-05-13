import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/entities/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  project!: Proyecto[];
  @Input() id: number=1;

  constructor(private proyectoService: ProyectoService, public authService: AuthService){}
  ngOnInit(): void {
    this.retrieveProyecto(this.id);
  }

  retrieveProyecto(personaid: number): void {
    this.proyectoService.getProyectoList(personaid)
      .subscribe({
        next: (data) => {
          this.project = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  deleteProyecto(id:number){
    if(id != undefined){
      this.proyectoService.deleteProyecto(id).subscribe(
        () =>{
          alert("Proyecto eliminado correctamente ")
          this.retrieveProyecto(this.id);
        }, () =>{
          alert("no se pudo eliminar el proyecto ")
        })
    }}
}
