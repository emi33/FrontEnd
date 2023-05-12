import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  numero: number= this.route.snapshot.params['id'];
  @Input() id: number=1;
  constructor( public authService: AuthService, private route: ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
