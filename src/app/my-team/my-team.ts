import { Component, inject } from '@angular/core';
import { PokemonapiService } from '../services/pokemonapi-service';
import { CommonModule } from '@angular/common'; 
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-team.html',
  styleUrl: './my-team.css'
})
export class MyTeam { 
  public pokeService = inject(PokemonapiService);
  private http = inject(HttpClient);
  getPokemonID(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  removeFromTeam(pokemon: any) {
  if (pokemon._id) {
    this.pokeService.removeFromTeam(pokemon._id);
  } else {
    console.error("This pokemon doesn't have a database _id!");
  }
}
}