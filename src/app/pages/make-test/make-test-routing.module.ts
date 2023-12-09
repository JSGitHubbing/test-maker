import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeTestComponent } from './make-test.component';

const routes: Routes = [
  {
    path: '',
    component: MakeTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeTestRoutingModule {}
