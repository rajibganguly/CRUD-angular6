import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'newEmployee', component: NewEmployeeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'edit/:id', component: EditEmployeeComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
