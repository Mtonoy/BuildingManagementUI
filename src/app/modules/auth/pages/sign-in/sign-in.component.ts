import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(private readonly fb: FormBuilder, private auth: AccountService, private route: Router) {}
  ngOnInit(): void {
    const currentUser = localStorage.getItem('jwt');
    if(!currentUser){
      this.route.navigate(['/auth/sign-in']);
    }
    this.createForm();


  }
  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }
  togglePasswordTextType(): void {
    this.passwordTextType = !this.passwordTextType;
  }
  onSubmit(): void {   
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    this.auth.login(this.form.getRawValue()).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.token) {
          this.auth.assignDashboard();
          
        }
      },
    });
  }
}
