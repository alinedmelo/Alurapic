import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'botao',
    templateUrl: './botao.component.html'
})

export class BotaoComponent {
    @Input() nome: string;
    @Input() estilo: string;
    @Input() tipo: string;
    @Input() desabilitado: boolean;
    @Output() acao = new EventEmitter();
    @Input() confirmacao: boolean = false;

    executaAcao() {

        if(this.confirmacao) {
            if(confirm('Tem certeza que deseja excluir a foto?')) {
                this.acao.emit();
            }
            return;
        }
        this.acao.emit(null);
    }
}

