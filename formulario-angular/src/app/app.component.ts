import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective } from 'ngx-mask';

import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatCardModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: []
})
export class AppComponent {

  userForm: FormGroup;
  submitted = false;
  apiResponse: any;
  totalErrors = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.userForm = this.fb.group({

      name: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      email: [
        '',
        [Validators.required, Validators.email]
      ],

      phone: [
        '',
        [Validators.required, Validators.minLength(11)]
      ],

      password: [
        '',
        [Validators.required, this.strongPasswordValidator]
      ]

    });

  }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasNumber && hasMinLength;

    return passwordValid ? null : { strongPassword: true };

  }

}