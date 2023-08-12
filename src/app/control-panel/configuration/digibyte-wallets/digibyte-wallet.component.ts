import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { DigiByteWallet } from '../../../shared/models/DigiByteWallet.model';
import { DigiByteWalletService } from 'src/app/shared/services/DigiByteWallet.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-digibyte-wallet',
  templateUrl: './digibyte-wallet.component.html'
})

export class ControlPanelConfigurationDigiByteWalletComponent implements OnInit, OnDestroy {
  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringDigiByteWalletId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;
  public controlName = new FormControl('', Validators.required);
  public controlAddress = new FormControl('', Validators.required);

  public pageTitle = 'Create new digibyte wallet'
  public digibyteWallet: DigiByteWallet = new DigiByteWallet();
  public shops: Shop[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private digibyteWalletService: DigiByteWalletService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlName,
      this.controlAddress
    ]);
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.queryStringDigiByteWalletId = routeParams.get('digibyteWalletId');

    if (this.queryStringDigiByteWalletId && this.queryStringDigiByteWalletId != 'new') {
      this.digibyteWalletService.getById(this.queryStringDigiByteWalletId).subscribe(x => { this.onRetrieveData(x); });
    }

    this.shopService.getList().subscribe(shops => this.shops = shops);
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  onRetrieveData(digibyteWallet: DigiByteWallet) {
    this.digibyteWallet = digibyteWallet;
    this.pageTitle = digibyteWallet.Name;
    this.controlName.setValue(digibyteWallet.Name);
    this.controlAddress.setValue(digibyteWallet.Address);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const digibyteWalletToUpdate: DigiByteWallet = Object.assign({}, this.digibyteWallet);
    digibyteWalletToUpdate.Name = this.controlName.value!;
    digibyteWalletToUpdate.Address = this.controlAddress.value!;

    if (this.queryStringDigiByteWalletId && this.queryStringDigiByteWalletId != 'new') {
      this.digibyteWalletService.update(digibyteWalletToUpdate).subscribe({
        next: result => this.handleResult(result),
        error: error => this.handleError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.digibyteWalletService.create(digibyteWalletToUpdate).subscribe({
        next: result => this.handleResult(result),
        error: error => this.handleError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  handleResult(result: MutationResult) {
    if (result.ErrorCode == 0) {
      this.router.navigate(['/control-panel/configuration/digibyte-wallets']);
    } else {
      if (result.Constraint == 'UNIQUE_DigiByteWallet_Name') {
        this.snackBarRef = this.snackBar.open('A digibyte wallet with this name already exists.', 'Close', { panelClass: ['error-snackbar'] });
      } else if (result.Constraint == 'UNIQUE_DigiByteWallet_Address') {
        this.snackBarRef = this.snackBar.open('A digibyte wallet with this address already exists.', 'Close', { panelClass: ['error-snackbar'] });
      } else {
        this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
      }
    }
  }

  handleError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}