import { Routes } from '@angular/router';
import { PokemonList } from './pokemon-list/pokemon-list';
import { MyTeam } from './my-team/my-team';
import { PokemonDetail } from './pokemon-detail/pokemon-detail';

export const routes: Routes = [
  { path: '', component: PokemonList }, 
  { path: 'team', component: MyTeam },
  { path: 'details/:name', component: PokemonDetail }
];