import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  users$: Observable<User[]> = this.usersSubject.asObservable();
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe((users) => {
      this.usersSubject.next(users);
    });
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUserName(id: number, newName: string): void {
    this.http.patch(`${this.apiUrl}/${id}`, { name: newName }).subscribe(() => {
      this.getUsers();
    });
  }
}
