import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.merchantValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['yyy', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    public get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
        
        this.authenticationService.login(this.f['username'].value, this.f['password'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from route parameters or default to '/'
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigate([returnUrl]);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}