import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { CD } from '../models/CD';
import { CdService } from '../services/api-CD.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.css']
})
export class CdComponent implements OnInit {
  lstCD: any;
  dtOptions: DataTables.Settings = {};
  cd: CD = {}as CD;
  crearCd:boolean = false;
  submitted:boolean = false;
  btnEditar: boolean = false;

  constructor(private formBuilder:FormBuilder, private apicd: CdService ) { }
  formulario = this.formBuilder.group({
    condicion: ['',Validators.required],
    nombreCd: ['',Validators.required],
    ubicacion: ['',Validators.required],
    estado: ['',Validators.required]
  })

  ngOnInit(): void {
    this.GetCds(); 
  }
  get f(){return this.formulario.controls} //esta sentencia sirve para ponerle un alias al formulario.


  resetFormulario(){
    this.formulario.reset();
  }
  mostrarCd(){
    this.btnEditar=false;
    this.crearCd=true;
    this.resetFormulario();
  }

  GetCds(){
    this.apicd.GetCd().subscribe(response => {
      this.lstCD = response.datos;
    })
  }
  

  //crear cds
  AddCds() {
    this.submitted = true;
    if (this.f.invalid) {
      return;
    } 

    Swal.fire({
      title: 'CD',
      text: '¿Desea guardar el CD?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) 
      {
    
        this.cd = Object.assign(this.cd, this.formulario.value);
        this.cd.estado = true;
        console.log(this.cd);
        this.apicd.addCd(this.cd).subscribe(response => {
          if(response.exito == 0){
            console.log(response.mensaje);
            return;
          }
          Swal.fire({
            title: 'CD',
            text: 'El cd se guardo con exito',
            icon: 'success',
            showCancelButton: false,
          })     
           this.GetCds(); 
        })
     
    
      }
  })
  }
  editCd(oCd: CD){
  
    console.log(oCd);

    this.f.condicion.setValue(oCd.condicion);
    this.f.numCd.setValue(oCd.nombreCd);
    this.f.ubicacion.setValue(oCd.ubicacion);
    this.crearCd = true;
    this.cd.id = oCd.id;
    this.btnEditar=true;
  }
  updateCd(){
    this.cd = Object.assign(this.cd, this.formulario.value);
    this.cd.estado = true;
    this.apicd.updateCd(this.cd).subscribe(response=>{
      if(response.exito == 0){
        console.log(response.mensaje);
        return;
      }
      alert(response.exito)
      this.GetCds();
     })
  }
  desactivarCd(cd: CD){
    this.apicd.desactivarcd(cd.id).subscribe(response => {
      if(response.exito == 0){
        console.log(response.mensaje);
        return;
      }
      alert(response.exito)
      this.GetCds();
    })
  }




}
