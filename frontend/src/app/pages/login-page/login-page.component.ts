import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: any) => {
        console.log(res.body.redirectURL); // Log the response to check if 'redirectURL' is present
        if (res.body.redirectURL) {
            this.router.navigate([res.body.redirectURL]);
        } else {
            // Handle login failure or other cases
            console.log('RedirectURL not found in response');
        }
    });
}


}
