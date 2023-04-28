import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/entities/educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent {
  @Input() currentEducacion: Educacion = {
    id:0,
    institucion: '',
    titulo: '',
    fechainicio:0,
    fechafin:0,
    personaid: 0
  };
  constructor(
    private educacionService: EducacionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getEducacion(this.route.snapshot.params['id']);
  }

  getEducacion(id: number): void {
    this.educacionService.getEducacion(id)
      .subscribe({
        next: (data) => {
          this.currentEducacion = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateEducacion(): void {
    if (this.currentEducacion.id != null) {
      this.educacionService.updateEducacion(this.currentEducacion.personaid,this.currentEducacion.id, this.currentEducacion)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/'+this.currentEducacion.personaid]);

          }, err => {
            alert("Error al cargar datos"+err);
          }
        );
    }
  }
}
