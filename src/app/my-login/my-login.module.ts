import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLoginPageRoutingModule } from './my-login-routing.module';

import { MyLoginPage } from './my-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLoginPageRoutingModule
  ],
  declarations: [MyLoginPage]
})
export class MyLoginPageModule {}
