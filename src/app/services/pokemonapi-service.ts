import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonapiService {
  private http = inject(HttpClient);
  pokemonList = signal<any[]>([]);
  selectedPokemon = signal<any>(null);
  myTeam = signal<any[]>([]);
  public searchTerm = signal('');
  getPokemonList() {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=151').subscribe((response) => {
      this.pokemonList.set(response.results);
    });
  }

  addToTeam(pokemon: any) {
    const currentTeam = this.myTeam();

    const isAlreadyInTeam = currentTeam.some((p) => p.name === pokemon.name); // check if pokemon is already in team

    if (isAlreadyInTeam) {
      alert(`${pokemon.name} is already in your team!`);
    } else if (currentTeam.length < 6) {
      this.myTeam.set([...currentTeam, pokemon]);
      alert(`${pokemon.name} added to your team!`);
    } else {
      alert('Your team is full! (Max 6)');
    }
  }

  getPokemonDetails(url: string) {
    this.http.get<any>(url).subscribe((response) => {
      this.selectedPokemon.set(response);
    });
  }

  getPokemonDetailsByName(name: string) {
    this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .subscribe((data) => this.selectedPokemon.set(data));
  }
}
