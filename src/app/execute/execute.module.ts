import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExecutePage } from './execute.page';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ExecutePage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ExecutePage }])

  ],
  entryComponents: [
    ExecutePage
    
  ]
})
export class ExecutePageModule {}
