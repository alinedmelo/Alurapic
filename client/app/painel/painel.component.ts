import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { FiltroPorTitulo } from '../foto/foto.pipes';

@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html',
    styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
    
    @Input() titulo: string;
    elemento: ElementRef;

    constructor(elemento: ElementRef) {
        this.elemento = elemento;
    }

    ngOnInit() {
        this.titulo = this.titulo.length > 20 ?
             this.titulo.substr(0, 20) + '...' : 
             this.titulo;
    }

    fadeOut(callback) {

        $(this.elemento.nativeElement).fadeOut(callback);
    }
    
}