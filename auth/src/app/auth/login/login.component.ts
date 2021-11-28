import { PostService } from 'src/app/post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = this.postService.isLoading;
  loginForm!: FormGroup;

  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];

    this.postService.loginUser(username, password);

    this.router.navigate(['home']);
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
