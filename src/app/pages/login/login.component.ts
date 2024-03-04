import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { GeneralService } from '../../general.service';
@Component({
  selector: 'app-login',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {


  ngOnInit(): void {
    if (this.generalService.isLogged()) {
      this.router.navigate(['/home'])
    }
  }
  loginErr = false;
  generalService = inject(GeneralService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.generalService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.loginErr = false;
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.log(err);
        this.loginErr = true;
      });
  }
  clearForm(): void {
    this.loginForm.patchValue({ email: '', password: '' });
    console.log('Borrado');
  }
}
