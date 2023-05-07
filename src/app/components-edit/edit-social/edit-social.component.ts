import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from 'src/app/entities/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-edit-social',
  templateUrl: './edit-social.component.html',
  styleUrls: ['./edit-social.component.css']
})
export class EditSocialComponent implements OnInit{
  @Input() currentContacto: Contacto = {
    id:0,
    social: '',
    user: '',
    personaid:0
  };
  constructor(
    private contactoService: ContactoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getContacto(this.route.snapshot.params['id']);
  }

  getContacto(id: number): void {
    this.contactoService.getContacto(id)
      .subscribe({
        next: (data) => {
          this.currentContacto = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateContacto(): void {
    if (this.currentContacto.id != null) {
      this.contactoService.updateContacto(this.currentContacto.personaid,this.currentContacto.id, this.currentContacto)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/'+this.currentContacto.personaid]);

          }, () => {
            alert("Error al cargar datos");
          }
        );
    }
  }
}
