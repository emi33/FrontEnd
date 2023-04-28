import { Component, Input, OnInit } from '@angular/core';
import { Educacion } from 'src/app/entities/educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  edu!: Educacion[];
  @Input() id: number=1;
constructor(private educacionService: EducacionService){}
ngOnInit(): void {
  this.retrieveEducacion(this.id);
}
retrieveEducacion(personaid: number): void {
  this.educacionService.getEducacionList(personaid)
    .subscribe({
      next: (data) => {
        this.edu = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}
deleteEducacion(id:number){
  if(id != undefined){
    this.educacionService.deleteEducacion(id).subscribe(
      data =>{
        alert("Educacion eliminada correctamente" + data)
        this.retrieveEducacion(this.id);
      }, err =>{
        alert("no se pudo eliminar la educacion" +err)
      })
  }}

}
