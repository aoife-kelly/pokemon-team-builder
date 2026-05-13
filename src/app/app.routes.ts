import { Routes } from '@angular/router';
import { PokemonList } from './pokemon-list/pokemon-list';
import { MyTeam } from './my-team/my-team';

export const routes: Routes = [
  { path: '', component: PokemonList }, 
  { path: 'team', component: MyTeam },   
];