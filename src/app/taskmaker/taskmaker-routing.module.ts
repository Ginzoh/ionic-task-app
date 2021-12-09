import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskmakerPage } from './taskmaker.page';

const routes: Routes = [
  {
    path: '',
    component: TaskmakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskmakerPageRoutingModule {}
