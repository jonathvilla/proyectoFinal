import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Cliente } from '../models/cliente';
import { ApiClienteService } from '../services/api-cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  lstCliente: Cliente;
  dtOptions: DataTables.Settings = {};
  cliente: Cliente = {}as Cliente;
  crearCliente:boolean = false;
  submitted:boolean = false;
  btnEditar: boolean = false;
  constructor(private formBuilder:FormBuilder, private apiCliente: ApiClienteService) { }

  formulario = this.formBuilder.group({
    direccion: ['',Validators.required],
    telefono: ['',Validators.required],
    nombre: ['',Validators.required],
    email: ['',Validators.required],
    nroDeIdentificacion: ['',Validators.required],
    temaInteres: ['',Validators.required],
    estado: ['',Validators.required]
  })
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.GetCliente();
  }

  get f(){return this.formulario.controls} //esta sentencia sirve para ponerle un alias al formulario.


  resetFormulario(){
    this.formulario.reset();
  }
  mostrarClientes(){
    this.btnEditar=false;
    this.crearCliente=true;
    this.resetFormulario();
  }

  GetCliente(){
    this.apiCliente.GetCliente().subscribe(response => {
      this.lstCliente = response.datos;
    })
  }

  AddCliente() {
    this.submitted = true;
    if (this.f.invalid) {
      return;
    } 

    Swal.fire({
      title: 'Cliente',
      text: '¿Desea guardar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) 
      {
    
        this.cliente = Object.assign(this.cliente, this.formulario.value);
        this.cliente.estado = true;
       // console.log(this.cliente);
        this.apiCliente.addCliente(this.cliente).subscribe(response => {
          if(response.exito == 0){
            console.log(response.mensaje);
            return;
          }
          Swal.fire({
            title: 'Cliente',
            text: 'El cliente se guardo con exito',
            icon: 'success',
            showCancelButton: false,
          })     
           this.GetCliente(); 
        })
     
    
      }
  })


  }
  editCliente(oCliente: Cliente){
  
    console.log(oCliente);

    this.f.direccion.setValue(oCliente.direccion);
    this.f.telefono.setValue(oCliente.telefono);
    this.f.nombre.setValue(oCliente.nombre);
    this.f.email.setValue(oCliente.email);
    this.f.nroDeIdentificacion.setValue(oCliente.nroDeIdentificacion);
    this.f.temaInteres.setValue(oCliente.temaInteres); 
  

    this.crearCliente = true;
    this.cliente.id = oCliente.id;
    this.btnEditar=true;
  }
  updateCliente(){
    this.cliente = Object.assign(this.cliente, this.formulario.value);
    this.cliente.estado = true;
    this.apiCliente.updateCliente(this.cliente).subscribe(response=>{
      if(response.exito == 0){
        console.log(response.mensaje);
        return;
      }
      alert(response.exito)
      this.GetCliente();
     })
  }

  desactivarCliente(cliente: Cliente){
    this.apiCliente.desactivarCliente(cliente.id).subscribe(response => {
      if(response.exito == 0){
        console.log(response.mensaje);
        return;
      }
      alert(response.exito)
      this.GetCliente();
    })
  }
}
