import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    {{state}}
  `,
  styles: [`
      :host {
          width: 45px;
          height: 45px;
          border: 1px solid #000000;
          border-collapse: collapse;
          text-align: center;
      }`]
})
export class SquareComponent implements OnInit {
  @Input() state;
  constructor() { }

  ngOnInit() {
  }



}
