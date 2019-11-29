import { Component, OnInit } from '@angular/core';
import { ModalSymbolComponent } from './modal-symbol.component';
import { PopoverController, ToastController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: 'config.page.html',
  styleUrls: ['config.page.scss']
})
export class ConfigPage implements OnInit {

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
    },
    {
      id: 3,
      name: "FIM"
    }
  ]
  private symbolId
  private stateId = '0';

  private currentSymbol;

  public ribbon = "";
  
  constructor(public popoverController: PopoverController, private toastController: ToastController, private router: Router) {
    

  }

  ngOnInit(){
    this.states =JSON.parse( localStorage.getItem('states'));
    this.symbols =JSON.parse( localStorage.getItem('symbols'));
  }

  async execute() {
    if(!this.ribbon){
      const toast = await this.toastController.create({
        message: 'Não foi possível executar, preencha a fita corretamente!',
        position: 'top',
        color: 'danger',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present(); 
      return;
    }
    localStorage.setItem('symbols', JSON.stringify(this.symbols));
    localStorage.setItem('states', JSON.stringify(this.states));
    localStorage.setItem('ribbon', this.ribbon);
    this.router.navigate(['/execute']);
    
  }

  async removeAll(){
    this.states = [
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
          {
            action: -1,
            toState: null,
            symbolId: '',
          },
  
        ]
      }
    ]
  
    this.symbols = [
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
      },
      {
        id: 3,
        name: "FIM"
      }
    ]

    this.symbolId
    this.stateId = '0';
  
    this.ribbon = "";

    const toast = await this.toastController.create({
      message: 'Os estados foram apagados!',
      position: 'top',
      color: 'success',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
    
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
