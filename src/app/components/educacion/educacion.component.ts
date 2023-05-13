import { Component, Input, OnInit } from '@angular/core';
import { Educacion } from 'src/app/entities/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  edu!: Educacion[];
  @Input() id: number=1;
constructor(private educacionService: EducacionService, public authService: AuthService ){}
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
      () =>{
        alert("Educacion eliminada ")
        this.retrieveEducacion(this.id);
      }, () =>{
        alert("no se pudo eliminar la educacion")
      })
  }}
 
}
