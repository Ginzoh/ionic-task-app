import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'taskmaker',
    loadChildren: () =>
      import('./taskmaker/taskmaker.module').then((m) => m.TaskmakerPageModule),
  },
  {
    path: 'add-product',
    loadChildren: () =>
      import('./add-product/add-product.module').then(
        (m) => m.AddProductPageModule
      ),
  },
  {
    path: 'task-detail/:id',
    loadChildren: () =>
      import('./task-detail/task-detail.module').then(
        (m) => m.TaskDetailPageModule
      ),
  },
  {
    path: 'my-login',
    loadChildren: () =>
      import('./my-login/my-login.module').then((m) => m.MyLoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
