import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { Constants } from 'src/app/shared/Constants';
import { Merchant } from 'src/app/shared/models/Merchant.model';

@Component({
  selector: 'control-panel-dashboard',
  templateUrl: './dashboard.component.html'
})

export class ControlPanelDashboardComponent implements OnInit {
  public activeMerchant?: Merchant | null;
  constants = Constants;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);
  }
}