import { Component } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LoadingComponent,MatToolbar,MatIcon,SearchComponent,CommonModule,SearchComponent,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private router: Router) {}

  onSearch(searchId: string): void {
    if (searchId) {
      this.router.navigate(['/user', searchId]);
    }
  }

}
