import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigPage } from './config.page';
import { ModalSymbolComponent } from './modal-symbol.component';



@NgModule({
  declarations: [ConfigPage, ModalSymbolComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ConfigPage }])
    
  ],
  entryComponents: [
    ModalSymbolComponent
    
  ]
})
export class ConfigPageModule {}
