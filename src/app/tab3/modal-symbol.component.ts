import {PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
    selector: 'modal-symbol.component',
    templateUrl: 'modal-symbol.component.html'
  })

export class ModalSymbolComponent {
    
    private symbol;
    private type;
    constructor(private popoverController: PopoverController) {}


    addSymbol(){
        this.popoverController.dismiss(this.symbol);
    }

}