import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = this.postsService.isLoading;
  constructor(private http: HttpClient, private postsService: PostService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const voornaam: string = value.voornaam;
    const achternaam: string = value.achternaam;
    const username: string = value.username;
    const password: string = value.password;
    const confirmPassword: string = value.confirmPassword;

    if (password !== confirmPassword) return console.log('Uw ww matched niet');

    // Send http
    this.postsService.createUser(voornaam, achternaam, username, password);

    form.reset();
  }
}
