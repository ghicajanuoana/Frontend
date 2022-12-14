import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  
  {
    path: "location",
    component: LocationComponent
  },
  {
    path: "test",
    component: TestComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
