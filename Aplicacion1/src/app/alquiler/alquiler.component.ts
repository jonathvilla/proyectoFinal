import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { from } from 'rxjs';
import Swal from 'sweetalert2'
import {Alquiler} from '../models/Alquiler';
import { ApiAlquilerService } from '../services/api-alquiler.service';


@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})

export class AlquilerComponent implements OnInit {
  crearAlquiler:boolean = false;
  submitted:boolean = false;
  alquiler: Alquiler = {} as Alquiler;
  lstAlquiler: any;
  lstClientes: any;
  fechaActual: any;
  lstcd: any;
  dtOptions: DataTables.Settings = {};
  detalles_Alquiler: any;
  mostrarDetalle: boolean = false;
  codigo_Alquiler: number;

  constructor(private formBuilder:FormBuilder, private ApiAlquiler: ApiAlquilerService) { }

  formulario = this.formBuilder.group({
    CodigoAlquiler: ['',Validators.required],
    ClienteId: ['',Validators.required],
    FechaAlquiler: ['',Validators.required],
    diasAlquiler: ['',Validators.required],
    CdIds: ['',Validators.required],
    ValorAlquiler: ['',Validators.required]
  })

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getalquiler();
    this.getcds();
    this.getclientes();
    this.getcd();
    this.fechaActual = new Date().toISOString();
  }

  get f(){return this.formulario.controls} //esta sentencia sirve para ponerle un alias al formulario.

  resetFormulario(){
    this.formulario.reset();

  }
// metodo para listar los clientes
  getclientes(){
    this.ApiAlquiler.GetCliente().subscribe(response=>{
      if(response.exito == 1)
      {
        //console.log(response.datos);
        this.lstClientes = response.datos;
      }
    })
  }

  // metodo para listar los detalles
  getalquiler(){
    console.log("si");
    this.ApiAlquiler.GetAlquiler().subscribe(response=>{
      console.log(response);
      if(response.exito == 1)
      {
        //console.log(response.datos);
        this.lstAlquiler = response.datos;
      }
    })
  }
    // metodo para listar los cd  
  getcds(){
    this.ApiAlquiler.Getcd().subscribe(response=>{
      if(response.exito == 1)
      {
        this.lstcd = response.datos;
      }
    })
  }

  getcd(){
    this.ApiAlquiler.Getcd().subscribe(response=>{
      if(response.exito == 1)
      {
        this.lstcd = response.datos;
       // console.log(response.datos);
      }
    })
  } 
  //metodo para agregar al quiler
  AddAlquiler() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }


    Swal.fire({
      title: 'Alquiler',
      text: '¿Desea guardar el alquiler?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) 
      {
        console.log(this.alquiler);
        this.alquiler = Object.assign(this.alquiler, this.formulario.value);
        this.alquiler.ClienteId = parseInt(this.alquiler.ClienteId);
        this.ApiAlquiler.AddAlquiler(this.alquiler).subscribe(response => {
          console.log("RESPONSE " + response);
          if(response.exito == 0){
            console.log(response.mensaje);
            return;
          }
          Swal.fire({
            title: 'Alquiler',
            text: ' El alquiler se guardo con exito',
            icon: 'success',
            showCancelButton: false,
          })     
           
        })
    
      }
  })
  }

  detalleAlquiler(item){
    this.detalles_Alquiler=item.detallesAlquilers;
    this.codigo_Alquiler=2;
    this.mostrarDetalle=true;
   // console.log(this.detalles_Alquiler);
  }

  sancionar(clienteId, ventaId){
    // this.apiVenta.metodoSancionar(clienteId, ventaId);
  }




}
