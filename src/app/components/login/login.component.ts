import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(public authService:AuthService){
   
  }
  log = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });
  ngOnInit(): void {
    
  }

  
}
