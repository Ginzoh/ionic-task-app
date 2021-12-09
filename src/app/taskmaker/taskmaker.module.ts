import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskmakerPageRoutingModule } from './taskmaker-routing.module';

import { TaskmakerPage } from './taskmaker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskmakerPageRoutingModule
  ],
  declarations: [TaskmakerPage]
})
export class TaskmakerPageModule {}
