import { Component, OnInit, inject, signal } from '@angular/core';
import { PokemonapiService } from '../services/pokemonapi-service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
  imports: []
})
export class PokemonList implements OnInit {
  public pokeService = inject(PokemonapiService);
  searchTerm = signal('');

  getPokemonID(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  ngOnInit(): void {
    this.pokeService.getPokemonList();
  }

  searchPokemon() {
    const query = this.searchTerm().toLowerCase();
    const filtered = this.pokeService.pokemonList().filter(pokemon => 
      pokemon.name.toLowerCase().includes(query)
    );
    this.pokeService.pokemonList.set(filtered);
  }

  clearSearch() {
  this.searchTerm.set(''); 
  this.pokeService.getPokemonList(); 
}
}