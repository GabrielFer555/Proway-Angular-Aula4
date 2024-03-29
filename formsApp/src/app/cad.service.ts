import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContato } from '../interfaces/IContato';

@Injectable({
  providedIn: 'root'
})
export class CadService {

  constructor(private http: HttpClient) { }
   
  gravar(dados: IContato):Observable<IContato>{
    return this.http.post<IContato>('http://localhost:3000/contatos', dados)
  }

  consultar():Observable<[IContato]>{
    return this.http.get<[IContato]>('http://localhost:3000/contatos')
  }

  consultarPorId(id:number):Observable<IContato>{
    return this.http.get<IContato>(`http://localhost:3000/contatos/${id}`)
  }

  excluir(id:number):Observable<string>{
   return this.http.delete<string>(`http://localhost:3000/contatos/${id}`)
  }

  editarContato(id:number, contato:IContato):Observable<string>{
    return this.http.put<string>(`http://localhost:3000/contatos/${id}`, contato)
  }
}
