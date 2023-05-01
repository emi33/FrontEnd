import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/entities/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit{
  @Input() currentProyecto: Proyecto = {
    id:0,
    nombreProyecto: '',
    descripcion: '',
    desarrollo: '',
    lanzamiento: 0,
    img: '',
    link:'',
    personaid:0
  };
  constructor(
    private proyectoService: ProyectoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getProyecto(this.route.snapshot.params['id']);
  }

  getProyecto(id: number): void {
    this.proyectoService.getProyecto(id)
      .subscribe({
        next: (data) => {
          this.currentProyecto = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateProyecto(): void {
    if (this.currentProyecto.id != null) {
      this.proyectoService.updateProyecto(this.currentProyecto.personaid,this.currentProyecto.id, this.currentProyecto)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/'+this.currentProyecto.personaid]);

          }, () => {
            alert("Error al cargar datos");
          }
        );
    }
  }
}
