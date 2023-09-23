import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe';
  loadFeature = 'recipe'


  navigate(feature:string)
  {
    this.loadFeature = feature
    console.log(this.loadFeature)
  }
}
