import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadTestComponent } from './load-test.component';

const routes: Routes = [
  {
    path: '',
    component: LoadTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadTestRoutingModule {}
