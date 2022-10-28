import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';
 
@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css'],
})
export class CabeceroComponent implements OnInit {
  isCollapsed = true;
  isDropdownCollapsed = true;
  isLoggedInt: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private configuracionServicio: ConfiguracionServicio
  ) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedInt = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedInt = false;
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe(configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    });
  }
  logout() {
    this.loginService.logout();
    this.isLoggedInt = false;
    this.router.navigate(['/login']);
  }
}
