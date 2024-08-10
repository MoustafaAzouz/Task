import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/Users/user.service';
import { HttpClientModule } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,MatIcon],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [
    trigger('hoverRight', [
      state('default', style({
        transform: 'translateX(0)'
      })),
      state('hovered', style({
        transform: 'translateX(10px)'
      })),
      transition('default <=> hovered', animate('200ms ease-in-out'))
    ])
  ]
})
export class UserDetailsComponent implements OnInit {
  user: any;
  error: string | null = null; // Define an error property
  hovered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.fetchUserById(+id).subscribe({
        next: (data: any) => {
          this.user = data;
          this.error = null; // Clear error on successful fetch
        },
        error: (err) => {
          this.error = 'Failed to load user details. Please try again later.';
          this.user = null; // Clear user data on error
        }
      });
    }
  }

  setHover(value: boolean): void {
    this.hovered = value;
  }
}
