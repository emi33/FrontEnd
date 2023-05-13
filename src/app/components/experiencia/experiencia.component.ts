import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/entities/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit{
  exp!: Experiencia[];
  @Input() id: number=1;

  constructor(private experienciaService: ExperienciaService, public authService: AuthService){}
  ngOnInit(): void {
    this.retrieveExperiencia(this.id);
  }

  retrieveExperiencia(personaid: number): void {
    this.experienciaService.getExperienciaList(personaid)
      .subscribe({
        next: (data) => {
          this.exp = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  deleteExperiencia(id:number){
    if(id != undefined){
      this.experienciaService.deleteExperiencia(id).subscribe(
        () =>{
          alert("Experiencia eliminada correctamente")
          this.retrieveExperiencia(this.id);
        }, () =>{
          alert("no se pudo eliminar la experiencia" )
        })
    }}

    
  }
  

