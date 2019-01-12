import { Component, OnInit, Input} from '@angular/core';
import { LoginVM } from '../model/LoginVM';
import { SampleService } from '../sample.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() loginVM:LoginVM = new LoginVM();

  constructor(private sampleService: SampleService,
    private router: Router) { }

  ngOnInit() {
    this.loginVM.rememberMe = true;
  }

  login(): void{
    this.sampleService.login(this.loginVM)
      .subscribe(val=>{
        localStorage.setItem("jhi-authenticationtoken", val.id_token);
        localStorage.setItem('login', this.loginVM.username);
        this.router.navigate(['/task']);
      });
  }

}
