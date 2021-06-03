import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-alquiler',
  templateUrl: './detalle-alquiler.component.html',
  styleUrls: ['./detalle-alquiler.component.css']
})
export class DetalleAlquilerComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  @Input() lstDetalles: any;
  @Input() codigo: number;


  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

}
