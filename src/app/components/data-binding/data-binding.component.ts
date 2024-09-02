import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {
    message: string = 'Hello, Angular!';

    changeMessage() {
      this.message = 'You have changed the message!';
    }

}
