import { Component } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls:['./directives.component.css']

})
export class DirectivesComponent {
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  showMessage: boolean = true;
  color: string = 'red';
  isRed: boolean = true;

  toggleMessage() {
    this.showMessage = !this.showMessage;
  }

  toggleClass() {
    this.isRed = !this.isRed;
  }
}
