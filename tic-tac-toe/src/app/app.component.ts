import { Component } from '@angular/core';
import {C} from "@angular/core/src/render3";

@Component({
  selector: 'app-root',
  template: `    
    <app-board></app-board>
  `,
  styles: []
})
export class AppComponent {
  title = 'Tic-Tac-Toe';
}

