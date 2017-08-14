import { Http, Headers, Response } from '@angular/http';
import { FotoComponent } from './foto.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FiltroPorTitulo } from './foto.pipes';
import { BotaoComponent } from '../botao/botao.component';

@Injectable()
export class FotoService { 
    
    http: Http;
    headers: Headers;
    url: string = 'v1/fotos';
    mensagem: string = '';
    
    constructor(http: Http) {
        
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');    
    }
    
    
    lista(): Observable<FotoComponent[]> {
        
        return this.http.get(this.url).map(res => res.json());
    }
    
    cadastrar(foto: FotoComponent): Observable<any> {
        
        if (foto._id) {

            return this.http
            .put(this.url + '/' + foto._id, JSON.stringify(foto),
            {headers:this.headers}).map(() =>  
                new MensagemCadastro('Foto alterada com sucesso', false));
        } else {

            return this.http
            .post(this.url, JSON.stringify(foto), 
            { headers: this.headers }).map(() => 
                new MensagemCadastro('Foto incluída com sucesso', true));
        }
    }
    
    remove(foto: FotoComponent):  Observable<Response> {
        
        return this.http.delete(this.url + '/' + foto._id);
    }
    
    buscaId(id: string): Observable<FotoComponent> {

        return this.http.get(this.url + '/' + id)
                        .map(res => res.json());
    }
}

export class MensagemCadastro {

    constructor(private _mensagem:string, private _inclusao:boolean) {

        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }

    get mensagem(): string {
        return this._mensagem;
    }
    get inclusao(): boolean {
        return this._inclusao;
    }
}