import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.css'],
})
export class NameListComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number | null = null;
  selectedUserName: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
    });

    this.userService.getUsers(); // Fetch users on component load
  }

  onSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const userId = Number(selectElement.value);

    this.userService.getUserById(userId).subscribe((user) => {
      if (user) {
        this.selectedUserId = user.id;
        this.selectedUserName = user.name;
      }
    });
  }

  onNameChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedUserName = inputElement.value;
  }

  onSaveName(): void {
    if (this.selectedUserId !== null) {
      this.userService.updateUserName(
        this.selectedUserId,
        this.selectedUserName
      );
      this.notificationService.notify(
        `Name updated to: ${this.selectedUserName}`
      );
    } else {
      this.notificationService.notify('Please select a user to update.');
    }
  }

  onViewDashboard(): void {
    if (this.selectedUserId !== null) {
      this.router.navigate(['/dashboard'], {
        queryParams: { id: this.selectedUserId },
      });
    } else {
      this.notificationService.notify(
        'Please select a user to view the dashboard.'
      );
    }
  }
}
