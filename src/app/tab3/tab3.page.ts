import { Component } from '@angular/core';
import { ModalSymbolComponent } from './modal-symbol.component';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public states = [
    {
      id: '0',
      name: '0',

      read: [
        {
          action: -1,
          toState: null,
          symbolId: '',

        },
        {
          action: -1,
          toState: null,
          symbolId: '',

        },
        {
          action: -1,
          toState: null,
          symbolId: '',
        },

      ]
    }
  ]

  private symbols = [
    {
      id: 0,
      name: "->"
    },
    {
      id: 1,
      name: "*"
    },
    {
      id: 2,
      name: "_"
    }
  ]
  private symbolId
  private stateId = '0';

  private currentSymbol;

  public ribbon;
  constructor(public popoverController: PopoverController, private toastController: ToastController) {


  }

  execute() {
    console.log(this.states);
  }


  async checkToState(id) {
    if (this.states[this.stateId].read[id].toState == '-1') {
      this.presentPopover(event, 'toState');
    }
  }


  async checkSymbol(id) {
    console.log(event);
    this.currentSymbol = id;
    if (this.states[this.stateId].read[id].symbolId == '-1') {
      this.presentPopover(event, 'symbol');
    }
  }


  async checkState(event) {
    if (this.stateId == '-1') {
      this.presentPopover(event, 'state');
    }
  }


  async presentPopover(ev: any, type) {
    const popover = await this.popoverController.create({
      component: ModalSymbolComponent,
      componentProps: { type: type },
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then((response) => {
      if (response.data && type == 'symbol') {
        this.addSymbol(response.data)
      } else if (response.data && type == 'state') {
        this.addState(response.data, type)
      } else if (response.data && type == 'toState') {
        this.addState(response.data, type)
      } else {
        if (this.stateId == '-1') {
          this.stateId = null;
        }
      }
    })
    return await popover.present();
  }



  async addSymbol(symbol) {
    let symbolsSize = this.symbols.length
    let newSimbol = {
      id: symbolsSize,
      name: symbol
    }

    let alreadyExist = this.symbols.find(element => element.name === symbol)

    if (alreadyExist) {
      const toast = await this.toastController.create({
        message: 'Não foi possível adicionar o símbolo ' + symbol + ', o mesmo já existe',
        position: 'top',
        color: 'danger',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();

    } else {
      this.symbols.push(newSimbol);
      let newRead = {
        action: -1,
        toState: null,
        symbolId: '',
      }
      this.states[this.stateId].read.push(newRead);
      this.states[this.stateId].read[this.currentSymbol].symbolId = symbolsSize + '';
      const toast = await this.toastController.create({
        message: 'Símbolo ' + symbol + ' adicionado',
        position: 'top',
        color: 'success',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();

    }
  }

  
  async addState(state, type) {
    let statesSize = this.states.length
    let newState = {
      id: statesSize + "",
      name: state,

      symbolId: null,
      read: [

        {
          action: -1,
          toState: null,
          symbolId: '',

        }
      ]
    }

    for (let i = 0; i < this.symbols.length; i++) {
      let to = {
        action: -1,
        toState: null,
        symbolId: '',
      }

      newState.read.push(to);

    }

    let alreadyExist = this.states.find(element => element.name === state)

    if (alreadyExist) {
      const toast = await this.toastController.create({
        message: 'Não foi possível adicionar o estado ' + state + ', o mesmo já existe',
        position: 'top',
        color: 'danger',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      this.stateId = alreadyExist.id;
      toast.present();
    } else {

      if (type == 'toState') {
        this.states[this.stateId].toState = newState.id;
      }

      this.states.push(newState);
      this.stateId = newState.id;



      const toast = await this.toastController.create({
        message: 'Símbolo ' + state + ' adicionado',
        position: 'top',
        color: 'success',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
    }
  }


}
