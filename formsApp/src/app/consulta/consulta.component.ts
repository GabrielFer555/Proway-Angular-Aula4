import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IContato } from '../../interfaces/IContato';
import { CadService } from '../cad.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit {
  contatos:IContato[] = []

  constructor(private service: CadService){}

  ngOnInit(): void {
     this.consultar()
  }

  excluir(id:any){
     this.service.excluir(id).subscribe(s => this.consultar())
  }

  consultar(){
    this.service.consultar()
     .subscribe(data => {  this.contatos = data})
  }
}