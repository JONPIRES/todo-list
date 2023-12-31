import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { TodoState } from './todo/todo-state';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent, TodoListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([TodoState], {
      developmentMode: true,
    }),
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
