import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../foto/foto.service.js';
import { MensagemCadastro } from '../foto/foto.service';
import { BotaoComponent } from '../botao/botao.component';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent { 

    foto: FotoComponent = new FotoComponent();
    meuForm: FormGroup;
    service: FotoService;
    route: ActivatedRoute;
    router: Router;
    mensagem: string = '';

    constructor(service: FotoService, fb: FormBuilder, route:  ActivatedRoute, router: Router) {
        
        this.route = route;
        this.router = router;
        this.service = service;

        this.route.params.subscribe(params => {
            let id = params['id'];
            console.log(id);

            if(id) {
                this.service.buscaId(id).subscribe(foto => {
                    this.foto = foto;
                }, erro => console.log(erro));
            }
        });

        this.meuForm = fb.group({
            titulo: ['', Validators.compose(
                [Validators.required, Validators.minLength(4)]
            )],
            url: ['', Validators.required],
            descricao: [''],
        });
    }

    cadastrar(event) {
        event.preventDefault();
        console.log(this.foto);

        this.service.cadastrar(this.foto).subscribe(res => {
                this.mensagem = res.mensagem;
                this.foto = new FotoComponent();
                if (!res.inclusao) {this.router.navigate([''])}
        }, erro => {
            console.log(erro);
            this.mensagem = 'Não foi possível salvar a foto, tente novamente';
        });
            
    }
}