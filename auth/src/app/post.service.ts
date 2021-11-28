import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostService {
  isLoading: boolean = false;
  userObj!: any;

  constructor(private http: HttpClient) {}

  createUser(
    voornaam: string,
    achternaam: string,
    username: string,
    keyphrase: string,
    wachtwoord: string
  ) {
    this.isLoading = true;
    this.http
      .post('http://localhost:3000/auth/signup', {
        voornaam,
        achternaam,
        username,
        keyphrase,
        wachtwoord,
      })
      .subscribe((responseData) => {
        this.isLoading = false;
        console.log(responseData);
      });
  }

  loginUser(username: string, wachtwoord: string) {
    this.isLoading = true;
    this.http
      .post('http://localhost:3000/auth/login', {
        username,
        wachtwoord,
      })
      .subscribe((responseData) => {
        this.isLoading = false;
        this.userObj = responseData;
      });
  }
}
