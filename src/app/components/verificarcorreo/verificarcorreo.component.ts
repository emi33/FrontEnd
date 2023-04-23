import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verificarcorreo',
  templateUrl: './verificarcorreo.component.html',
  styleUrls: ['./verificarcorreo.component.css']
})
export class VerificarcorreoComponent implements OnInit{

  constructor(public authService: AuthService){}
  ngOnInit(): void {
    
  }

}
