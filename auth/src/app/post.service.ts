import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostService {
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  createUser(
    voornaam: string,
    achternaam: string,
    username: string,
    wachtwoord: string
  ) {
    this.isLoading = true;
    this.http
      .post('http://localhost:3000/auth/signup', {
        voornaam,
        achternaam,
        username,
        wachtwoord,
      })
      .subscribe((responseData) => {
        this.isLoading = false;
        console.log(responseData);
      });
  }

  fetchUsers() {
    //..
  }
}
