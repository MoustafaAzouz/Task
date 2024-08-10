import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule,MatIcon],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }


  onSearch(event: any): void {
    const inputElement = event.target;
    const numericValue = inputElement.value.trim().replace(/\D/g, '');
  
    inputElement.value = numericValue;
  
    this.search.emit(numericValue);}}