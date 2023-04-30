import { Component, Input } from '@angular/core';
import { Habilidad } from 'src/app/entities/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent {
  skill!: Habilidad[];
  @Input() id: number=1;

  constructor(private habilidadService: HabilidadService){}
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
        data =>{
          alert("Habilidad eliminada correctamente " + data)
          this.retrieveHabilidad(this.id);
        }, err =>{
          alert("no se pudo eliminar la Habilidad " + err)
        })
    }}
}
