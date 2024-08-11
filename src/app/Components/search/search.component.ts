import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {}

  onSearch(event: any): void {
    const inputElement = event.target;
    const numericValue = inputElement.value.trim().replace(/\D/g, '');
    
    inputElement.value = numericValue;
    
    if (numericValue === '') {
      // Navigate back to root if the input is empty
      this.router.navigate(['/']);
    } else {
      // Emit the numeric value as the search query
      this.search.emit(numericValue);
      // Navigate to the user details based on the full input
      this.router.navigate([`/user/${numericValue}`]);
    }
  }
}