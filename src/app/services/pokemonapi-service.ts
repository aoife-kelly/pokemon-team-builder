import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonapiService {
  private http = inject(HttpClient);
  pokemonList = signal<any[]>([]);
  selectedPokemon = signal<any>(null);
  getPokemonList() {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=151').subscribe((response) => {
      this.pokemonList.set(response.results);
    });
  }

  getPokemonDetails(url: string) {
    this.http.get<any>(url).subscribe((response) => {
      this.selectedPokemon.set(response);
    });
  }
}
