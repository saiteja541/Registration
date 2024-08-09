import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Marking as standalone
  imports: [CommonModule, RegisterComponent],  // Importing dependencies
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  registeredData: any = null;

  displayData(data: any) {
    this.registeredData = data;
  }
}
