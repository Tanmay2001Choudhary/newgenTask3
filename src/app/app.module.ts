import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NameListComponent } from './name-list/name-list.component';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';
import { TextBoxComponent } from './text-box/text-box.component';

@NgModule({
  declarations: [
    AppComponent,
    TextBoxComponent,
    NameListComponent,
    DashboardComponent,
    NotificationComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
