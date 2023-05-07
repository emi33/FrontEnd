import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-add-social',
  templateUrl: './add-social.component.html',
  styleUrls: ['./add-social.component.css']
})
export class AddSocialComponent {
  socials = {
    social: '',
    user: '',
    personaid: 0
  };

  constructor(private contactoService: ContactoService, private router: Router, private route: ActivatedRoute) { }
  submitted = false;
  ngOnInit(): void {

  }
  saveContacto(): void {
    const data = {
      social: this.socials.social,
      user: this.socials.user,
      personaid: this.route.snapshot.params['personaid']
    };
    this.contactoService.createContacto(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        }, error => {
          console.log(error);
        });
  }
  newContacto(): void {
    this.submitted = false;
    this.socials = {
      social: '',
      user: '',
      personaid: 0
    };
  }
}
