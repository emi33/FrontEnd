import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  id!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params['id']!= null){
      this.id = this.route.snapshot.params['id'];
    } else {
      this.id=1;
    }
  }

}
