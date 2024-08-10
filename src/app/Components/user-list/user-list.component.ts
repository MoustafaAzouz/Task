import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../Services/Users/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SearchComponent } from '../search/search.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { BorderBottomDirective } from '../../Directives/my-directive.directive';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    LoadingComponent,
    BorderBottomDirective,
    SearchComponent,
    MatSnackBarModule,
    PaginationComponent,
    MatIcon
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('hover', [
      state('default', style({
        transform: 'scale(1)',
        boxShadow: 'none'
      })),
      state('hovered', style({
        transform: 'scale(1.05)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      })),
      transition('default <=> hovered', animate('200ms ease-in-out'))
    ])
  ]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  page: number = 1;
  totalPages: number = 1;  
  hoveredIndex: number | null = null;
  isSearchActive: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUsers(this.page);
  }

  fetchUsers(page: number): void {
    this.userService.fetchPage(page).subscribe(response => {
      if (response) {
        this.totalPages = response.total_pages; 
        this.users = this.userService.getAllUsers(); 
        this.filteredUsers = response.data; 
      }
    });
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }

  setHoveredIndex(index: number | null): void {
    this.hoveredIndex = index;
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchUsers(this.page);
  }

  onSearch(searchId: string): void {
    this.isSearchActive = !!searchId;
    if (searchId) {
      this.filteredUsers = this.users.filter(user => user.id.toString() === searchId);
      if (this.filteredUsers.length === 0) {
        this.showNoResultsToast();
      }
    } else {
      this.fetchUsers(this.page); 
    }
  }

  showNoResultsToast(): void {
    this.snackBar.open('This ID does not exist', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}