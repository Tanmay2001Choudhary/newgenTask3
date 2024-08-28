import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  latestModifiedUsers: User[] = [];
  private routeSub: Subscription = new Subscription();
  private usersSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      const userId = Number(params['id']);
      if (userId) {
        this.userService.getUserById(userId).subscribe((user) => {
          this.user = user || null;
        });
      }
    });

    this.userService.users$.subscribe((users) => {
      this.latestModifiedUsers = users;
    });

    this.userService.getUsers(); // Fetch users on component load
  }
  onSearch(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.userService.users$.subscribe((users) => {
      this.latestModifiedUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText)
      );
    });
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.usersSub.unsubscribe();
  }
}
