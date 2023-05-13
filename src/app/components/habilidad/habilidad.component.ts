import { Component, Input, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/entities/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent implements OnInit{
  skill!: Habilidad[];
  @Input() id: number=1;

  constructor(private habilidadService: HabilidadService, public authService: AuthService){}
  ngOnInit(): void {
    this.retrieveHabilidad(this.id);
  }

  retrieveHabilidad(personaid: number): void {
    this.habilidadService.getHabilidadList(personaid)
      .subscribe({
        next: (data) => {
          this.skill = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  deleteHabilidad(id:number){
    if(id != undefined){
      this.habilidadService.deleteHabilidad(id).subscribe(
        () =>{
          alert("Habilidad eliminada correctamente ")
          this.retrieveHabilidad(this.id);
        }, () =>{
          alert("no se pudo eliminar la Habilidad ")
        })
    }}
}
