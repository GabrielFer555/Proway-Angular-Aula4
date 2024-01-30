import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CadService } from '../cad.service';
import { IContato } from '../../interfaces/IContato';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edicao',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})
export class EdicaoComponent implements OnInit {

  idParams:any;
  myContato!:IContato;
  contatoForm:FormGroup = new FormGroup({
    lastName: new FormControl('',[Validators.required]),
    firstName: new FormControl(''),
    email: new FormControl('')
  })

  constructor(private routes:ActivatedRoute, private myServices:CadService, private router:Router){}

  ngOnInit(): void {
    let params = this.routes.snapshot.params;
    this.idParams = params['id'] || ''
    console.log(this.idParams)
    this.consultar()
  }


  consultar():void{
    this.myServices.consultarPorId(this.idParams).subscribe(data => {
      this.myContato = data;
      
      this.contatoForm.patchValue({
        id:data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      })
    })
  }

  salvar():void{
    let obj:IContato = {
      id: this.contatoForm.value.id || '',
      firstName: this.contatoForm.value.firstName,
      lastName: this.contatoForm.value.lastName,
      email: this.contatoForm.value.email
    }

    this.myServices.editarContato(this.idParams, obj).subscribe(()=> this.router.navigate(['/consulta']))
  }
}
