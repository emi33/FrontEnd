import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/entities/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit{
  @Input() currentExperiencia: Experiencia = {
    id:0,
    cargo: '',
    descripcion: '',
    empresa:'',
    fecha:0,
    fechafin:0,
    personaid: 0
  };
  constructor(
    private experienciaService: ExperienciaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getExperiencia(this.route.snapshot.params['id']);
  }

  getExperiencia(id: number): void {
    this.experienciaService.getExperiencia(id)
      .subscribe({
        next: (data) => {
          this.currentExperiencia = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateExperiencia(): void {
    if (this.currentExperiencia.id != null) {
      this.experienciaService.updateExperiencia(this.currentExperiencia.personaid,this.currentExperiencia.id, this.currentExperiencia)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/'+this.currentExperiencia.personaid]);

          }, err => {
            alert("Error al cargar datos");
          }
        );
    }
  }
}
