import { Component, inject } from '@angular/core';
import { PokemonapiService } from '../services/pokemonapi-service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-my-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-team.html',
  styleUrl: './my-team.css'
})
export class MyTeam { 
  public pokeService = inject(PokemonapiService);

  getPokemonID(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  removeFromTeam(pokemon: any) {
    const currentTeam = this.pokeService.myTeam();
    const updatedTeam = currentTeam.filter(p => p.name !== pokemon.name);
    this.pokeService.myTeam.set(updatedTeam);
  }
}