import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order.model'

@Component({
  selector: 'control-panel-sales-order',
  templateUrl: './order.component.html'
})

export class OrderComponent {
  public order: Order = new Order();
}