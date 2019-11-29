import { Component, OnInit, AfterViewInit } from '@angular/core';
import { element } from 'protractor';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: 'execute.page.html',
  styleUrls: ['execute.page.scss']
})

export class ExecutePage implements AfterViewInit {

  private states;  
  private ribbon;
  private symbols;
  
  private i = 0;
  private state = 0;

  private condition;
  
  private timeOut;
  private ribbonText;

  private originalRibbon;
  private running;

  constructor(private toast: ToastController,) {


  }

  ngAfterViewInit(){
    
    this.states = JSON.parse(localStorage.getItem('states'))
    this.ribbon = Array.from(localStorage.getItem('ribbon'));
    this.ribbon.unshift("->");

    this.originalRibbon = localStorage.getItem('ribbon');

    this.symbols = JSON.parse(localStorage.getItem('symbols')); 

    this.putSymbols();
  }

  putSymbols(){
    this.states.forEach(state => {
        state.read.map(read => {
          read.symbol = this.symbols.find(symbol => symbol.id == read.symbolId).name;
          return read;
        });
    });
  }

  execute(){
    this.condition = "RUNNING";
    this.running = true;
    if(this.condition != "FIM"){
      this.analyzeSymbol();
    }

  }

  async prepareExecute(){
    if(this.condition == "RUNNING"){
      const warningToast = await this.toast.create({
        message: 'Outra execução em andamento!',
        position: 'top',
        color: 'warning',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      warningToast.present();

    }else{
      this.clearExecution();
      this.execute()
    }
    
  }

  stopExecution(){
    this.condition = "STOP";
  }
  
  clearExecution(){
    this.i = 0;
    this.state= 0.
    this.condition = "";
    this.ribbon =  Array.from(this.originalRibbon);
    this.ribbon.unshift('->');
  }

  analyzeSymbol(){
   
    setTimeout(async () => {

      let step 
      if(this.states[this.state]){
        step = this.states[this.state].read.find((element, index) => {
          if(this.symbols[index]){
            return this.symbols[index].name == this.ribbon[this.i]
          }
          return null;
        });
      }
      

      if(!step){
        
        step = this.states[this.state].read.find((element, index) => {
          return this.symbols[index].name == this.ribbon[this.i-1]
        });
       
      }

        if (step.symbol == 'FIM') {
          this.condition= 'FIM';
          this.cleanRibbon()
          this.running = false;
          const successToast = await this.toast.create({
            message: 'Execução concluída com sucesso!',
            position: 'top',
            color: 'success',
            duration: 2000,
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
  
          successToast.present();
        }else if(this.condition == "STOP"){
          this.stopExecution();
          this.clearExecution();
          
          const successToast = await this.toast.create({
            message: 'Execução interrompida!',
            position: 'top',
            color: 'danger',
            duration: 2000,
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
  
          successToast.present();
          this.running = false;
        } else {
  
          this.ribbon[this.i] = step.symbol;
          
          if (step.action == 'left') {
            this.i--;
          }
  
          if (step.action == 'right') {
            
            this.i++;
            if(this.i == this.ribbon.length){
              this.ribbon[this.i] = '_';
            }
          }
  
          this.state = step.toState;
          this.analyzeSymbol();
  
        }  
      
    },200);
  }
  

  cleanRibbon() {
    let index

    do{

      index = this.ribbon.findIndex(element => {
      return element == '_'
      });

      if(index != -1){
        this.ribbon.splice(index, 1);
      }

    }while(index != -1);

    this.ribbonText = this.ribbon.toString();
  }






}
