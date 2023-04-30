import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Habilidad } from 'src/app/entities/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-edit-habilidad',
  templateUrl: './edit-habilidad.component.html',
  styleUrls: ['./edit-habilidad.component.css']
})
export class EditHabilidadComponent implements OnInit{
  @Input() currentHabilidad: Habilidad = {
    id:0,
    habilidad: '',
    porcentaje: 0,
    semana:0,
    mensual:0,
    personaid:0
  };
  constructor(
    private habilidadService: HabilidadService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getHabilidad(this.route.snapshot.params['id']);
  }

  getHabilidad(id: number): void {
    this.habilidadService.getHabilidad(id)
      .subscribe({
        next: (data) => {
          this.currentHabilidad = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateHabilidad(): void {
    if (this.currentHabilidad.id != null) {
      this.habilidadService.updateHabilidad(this.currentHabilidad.personaid,this.currentHabilidad.id, this.currentHabilidad)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/'+this.currentHabilidad.personaid]);

          }, () => {
            alert("Error al cargar datos");
          }
        );
    }
  }
}
