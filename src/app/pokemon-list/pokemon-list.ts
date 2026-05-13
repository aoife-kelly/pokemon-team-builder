import { Component, OnInit, inject, signal } from '@angular/core';
import { PokemonapiService } from '../services/pokemonapi-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
  imports: [RouterLink],
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
    const query = this.pokeService.searchTerm().toLowerCase();
    const filtered = this.pokeService
      .pokemonList()
      .filter((pokemon) => pokemon.name.toLowerCase().includes(query));
    this.pokeService.pokemonList.set(filtered);
  }

  clearSearch() {
    this.pokeService.searchTerm.set(''); // clear the search term
    this.pokeService.getPokemonList(); // reset the pokemon list to the full list
  }
}
