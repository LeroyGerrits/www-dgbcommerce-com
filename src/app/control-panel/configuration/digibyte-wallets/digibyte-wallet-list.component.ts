import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Environment } from 'src/app/shared/environments/Environment';
import { DigiByteWallet } from 'src/app/shared/models/DigiByteWallet.model';
import { DigiByteWalletService } from 'src/app/shared/services/DigiByteWallet.service';

@Component({
  selector: 'control-panel-configuration-digibyte-wallet-list',
  templateUrl: './digibyte-wallet-list.component.html'
})

export class ControlPanelConfigurationDigiByteWalletListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  environment = Environment;
  dataSource = new MatTableDataSource<DigiByteWallet>;
  displayedColumns: string[] = ['Name', 'Address', 'ActionButtons'];

  constructor(
    private router: Router,
    private digibyteWalletService: DigiByteWalletService
  ) { }

  ngOnInit(): void {
    this.digibyteWalletService.getList().subscribe(digibyteWallets => {
      this.dataSource = new MatTableDataSource(digibyteWallets);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}`);
    } else {
      console.log('Sorting cleared');
    }
  }

  editElement(element: DigiByteWallet) {
    this.router.navigate([`/control-panel/configuration/delivery-methods/${element.Id}`]);
  }

  deleteElement(element: DigiByteWallet) {
    if (confirm('Are you sure you want to delete this record?')) {
      console.log(element);
      alert('boom!');
    }
  }
}