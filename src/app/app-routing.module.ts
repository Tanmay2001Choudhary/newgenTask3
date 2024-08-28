import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NameListComponent } from './name-list/name-list.component';
import { TextBoxComponent } from './text-box/text-box.component';

const routes: Routes = [
  { path: '', component: TextBoxComponent },
  { path: 'names', component: NameListComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
