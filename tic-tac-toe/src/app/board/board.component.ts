import {Component, OnInit} from '@angular/core';
import {LogicService} from "../logic.service";

@Component({
  selector: 'app-board',
  template: `
      <div class="board">
          <div class="header">
              <button class="restart-button" (click)="restart()">Restart Game</button>
              <p>{{ win ? win.toUpperCase() : null}}</p>
          </div>
          <div class="row" *ngFor="let boardRow of matrix; let row = index">
              <app-square *ngFor="let box of boardRow; let col = index;"
                          [ngClass]="matrix[row][col]"
                          (click)="makeMove(col,row)"></app-square>
          </div>
      </div>
  `,
  styles: [`
      .board {
          min-width: 500px;
          min-height: 500px;
          width: ${47*Math.floor((document.documentElement.clientWidth -100)/ 47)}px;
          height: ${47*Math.floor((document.documentElement.clientHeight-130)/ 47)}px;
          margin: 0 auto;
      }

      .restart-button {
          background: none;
          font-size: 20px;
          border: 1px solid black;
      }

      .player:after {
          content: "x";
          font-size: 40px;
          position: relative;
          top: -4px;
          font-family: sans-serif;
      }

      .computer:after {
          content: "o";
          font-size: 40px;
          position: relative;
          top: -4px;
          font-family: sans-serif;
      }

      .header {
          height: 50px;
          width: 100%;
          display: flex;
          font-size: 20px;
          padding: 20px;
          align-items: center;
          justify-content: space-around;
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
  private win: string;

  constructor(private logicService: LogicService) {
    this.boardHeight = Math.floor((document.documentElement.clientWidth - 100) / 47) < 5 ? 5 : Math.floor((document.documentElement.clientWidth - 30) / 47);
    this.boardWidth = Math.floor((document.documentElement.clientHeight - 130) / 47) < 5 ? 5 : Math.floor((document.documentElement.clientHeight - 70) / 47);
  }

  ngOnInit() {
    this.restart()
  }

  public makeMove(col, row) {
    this.player = "player";
    if (this.matrix[row][col] === null && this.win === null) {
      this.matrix[row][col] = this.player;
      let winner = this.chkWinner(this.matrix);
      this.matrix = this.logicService.computerPlay(this.matrix);
      winner = this.chkWinner(this.matrix)
      if (winner !== 0) {
        this.win = winner + " win!"
      }
    }
  }

  public restart () {
    this.matrix = []
    for(let i = 0; i < this.boardWidth; i++){
      this.matrix[i] = [];
      for(let j = 0; j < this.boardHeight; j++){
        this.matrix[i][j] = null;
      }
    }

    this.win = null;
  }

  private chkLine(a, b, c, d, e) {
    return ((a != null) && (a == b) && (a == c) && (a == d) && (a == e));
  }

  private chkWinner(bd) {
    // Check down
    let r, c;
    for (r = 0; r < bd.length - 5; r++)
      for (c = 0; c < bd[0].length; c++)
        if (this.chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c], bd[r + 4][c]))
          return bd[r][c];

    // Check right
    for (r = 0; r < bd.length; r++)
      for (c = 0; c < bd[0].length - 4; c++)
        if (this.chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3], bd[r][c + 4]))
          return bd[r][c];

    // Check down-right
    for (r = 0; r < bd.length - 4; r++)
      for (c = 0; c < bd[0].length-4; c++)
       if (this.chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2], bd[r + 3][c + 3], bd[r + 4][c + 4]))
          return bd[r][c];

    // Check down-left
    for (r = 4; r < bd.length; r++)
      for (c = 0; c < bd[0].length - 4; c++)
        if (this.chkLine(bd[r][c], bd[r - 1][c + 1], bd[r - 2][c + 2], bd[r - 3][c + 3], bd[r - 4][c + 4]))
          return bd[r][c];

    return 0;
  }
}
