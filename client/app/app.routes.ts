import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FotoComponent } from './foto/foto.component';

const appRoutes: Routes  = [
  { path: '', component: ListagemComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/:_id', component: CadastroComponent },
  { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);