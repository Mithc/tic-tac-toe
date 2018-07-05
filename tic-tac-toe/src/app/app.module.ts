import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import {LogicService} from "./logic.service";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [LogicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
