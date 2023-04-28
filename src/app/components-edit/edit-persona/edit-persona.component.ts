import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/entities/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentPersona: Persona = {

    nombre: '',
    apellido: '',
    edad: 0,
    acercade:'',
    ocupacion:'',
    imagen:'',
    banner:''
  };

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {

      this.getPersona(this.route.snapshot.params['id']);
    }
  }

  getPersona(id: number): void {
    this.personaService.getPersona(id)
      .subscribe({
        next: (data) => {
          this.currentPersona = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePersona(): void {
    if (this.currentPersona.id != null) {
      this.personaService.updatePersona(this.currentPersona.id, this.currentPersona)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/'+this.currentPersona.id]);

          }, err => {
            alert("Error al cargar datos "+err);
          }
        );
    }

  }
}