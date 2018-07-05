import { Injectable } from '@angular/core';

@Injectable()
export class LogicService {
  private random1: number;
  private random2: number;

  constructor() { }

  public computerPlay(matrix): Array<Array<string>> {
    this.random1 = Math.floor(Math.random()*matrix.length);
    this.random2 = Math.floor(Math.random()*matrix[0].length);
    if(matrix[this.random1][this.random2] === null) {
      matrix[this.random1][this.random2] = "0"
    }
    else {
      this.computerPlay(matrix)
    }
    return matrix
  }
}
