import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeTestModule } from './pages/take-test/take-test.module';
import { LoadTestModule } from './pages/load-test/load-test.module';
import { MakeTestModule } from './pages/make-test/make-test.module';
import { AppRoutes } from './constants/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.TestCollection,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.TestCollection,
    loadChildren: () =>
      import('./pages/load-test/load-test.module').then((m) => LoadTestModule),
  },
  {
    path: AppRoutes.TakeTest,
    loadChildren: () =>
      import('./pages/take-test/take-test.module').then((m) => TakeTestModule),
  },
  {
    path: AppRoutes.MakeTest,
    loadChildren: () =>
      import('./pages/make-test/make-test.module').then((m) => MakeTestModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
