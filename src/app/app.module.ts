import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClockComponent } from './clock/clock.component';

@NgModule({
  declarations: [
    ClockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ClockComponent]
})
export class AppModule { }
