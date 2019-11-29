import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router) {}

  sub(){
    let states = [{"id":"0","name":"0","read":[{"action":"right","toState":"0","symbolId":"0"},{"action":"right","toState":"0","symbolId":"1"},{"action":"right","toState":"1","symbolId":"2"},{"action":-1,"toState":null,"symbolId":""}]},{"id":"1","name":1,"symbolId":null,"read":[{"action":-1,"toState":null,"symbolId":""},{"action":"right","toState":"2","symbolId":"2"},{"action":"right","toState":"1","symbolId":"2"},{"action":-1,"toState":null,"symbolId":""},{"action":-1,"toState":null,"symbolId":""}]},{"id":"2","name":2,"symbolId":null,"read":[{"action":-1,"toState":null,"symbolId":""},{"action":"left","toState":"3","symbolId":"1"},{"action":"left","toState":"4","symbolId":"2"},{"action":-1,"toState":null,"symbolId":""},{"action":-1,"toState":null,"symbolId":""}]},{"id":"3","name":3,"symbolId":null,"read":[{"action":"left","toState":"1","symbolId":"1"},{"action":"right","toState":"0","symbolId":"2"},{"action":"left","toState":"3","symbolId":"2"},{"action":-1,"toState":null,"symbolId":""},{"action":-1,"toState":null,"symbolId":""}]},{"id":"4","name":4,"symbolId":null,"read":[{"action":-1,"toState":null,"symbolId":""},{"action":"right","toState":"5","symbolId":"2"},{"action":"left","toState":"4","symbolId":"2"},{"action":-1,"toState":null,"symbolId":""},{"action":-1,"toState":null,"symbolId":""}]},{"id":"5","name":5,"symbolId":null,"read":[{"action":"right","toState":"5","symbolId":"3"},{"action":"right","toState":"5","symbolId":"3"},{"action":"right","toState":"4","symbolId":"3"},{"action":-1,"toState":null,"symbolId":""},{"action":-1,"toState":null,"symbolId":""}]}];
    let symbols = [{"id":0,"name":"->"},{"id":1,"name":"*"},{"id":2,"name":"_"},{"id":3,"name":"FIM"}];
    localStorage.setItem('states', JSON.stringify(states))
    localStorage.setItem('symbols', JSON.stringify(symbols))
    localStorage.setItem('ribbon', '**_*');
    this.router.navigate([('execute')]);
  }

}
