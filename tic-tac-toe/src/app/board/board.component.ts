import {Component, OnInit} from '@angular/core';
import {LogicService} from "../logic.service";

@Component({
  selector: 'app-board',
  template: `
      <div class="board">
          <div class="row" *ngFor="let boardRow of matrix; let row = index">
              <app-square *ngFor="let box of boardRow; let col = index;"
                          [state]="matrix[row][col]"
                          (click) = "makeMove(col,row)"></app-square>
          </div>
      </div>
  `,
  styles: [`
      .board {
          min-width: 500px;
          min-height: 500px;
          width: ${47*Math.floor((document.documentElement.clientWidth -30)/ 47)}px;
          height: ${47*Math.floor((document.documentElement.clientHeight-30)/ 47)}px;
          margin: 15px auto;
      }
    .row {
        display: flex;
    }
  `]
})
export class BoardComponent implements OnInit {
  public boardHeight: number;
  public boardWidth: number;
  private player: string;
  public matrix: Array<Array<number | string>>;

  constructor(private logicService: LogicService) {
    this.boardHeight = Math.floor((document.documentElement.clientWidth - 30) / 47);
    this.boardWidth = Math.floor((document.documentElement.clientHeight - 70) / 47);
  }

  ngOnInit() {
    this.matrix = Array(this.boardWidth).fill(Array(this.boardHeight).fill(null))
  }

  public makeMove(col,row) {
    console.log(this.matrix);
    this.player = "X";
    if (this.matrix[row][col] === null) {
      console.log(row, col)
      this.matrix[row][col] = this.player;
      console.log(this.matrix[row][col])
      let winner = this.chkWinner(this.matrix);
      this.matrix = this.logicService.computerPlay(this.matrix);
      winner = this.chkWinner(this.matrix)
      if(winner !== 0) {
        console.log(winner, "win")
      }
    }
  }
  private chkLine(a,b,c,d, e) {
    return ((a != null) && (a ==b) && (a == c) && (a == d)&& (a == e));
  }

  private chkWinner(bd) {
    // Check down
    let r, c;
    for (r = 0; r < bd.length-5; r++)
      for (c = 0; c < bd[0].length; c++)
        if (this.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c], bd[r+4][c]))
          return bd[r][c];

    // Check right
    for (r = 0; r < bd.length; r++)
      for (c = 0; c < bd[0].length-4; c++)
        if (this.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3], bd[r][c+4]))
          return bd[r][c];

    // Check down-right
    for (r = 0; r < bd.length -4; r++)
      for (c = 4; c < bd.length[0]; c++)
        if (this.chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3], bd[r+4][c+4]))
          return bd[r][c];

    // Check down-left
    for (r = 4; r < bd.length; r++)
      for (c = 0; c < bd[0].length -4; c++)
        if (this.chkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3], bd[r-4][c+4]))
          return bd[r][c];

    return 0;
  }
}
