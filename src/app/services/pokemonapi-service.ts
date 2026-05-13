import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonapiService {
  private http = inject(HttpClient);
  public selectedPokemon = signal<any>(null);
  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private backendUrl = environment.apiUrl;
  public pokemonList = signal<any[]>([]);
  public myTeam = signal<any[]>([]);
  public searchTerm = signal('');

  constructor() {
    this.loadTeam();
  }

  getPokemonList() {
    this.http.get<any>(`${this.pokeApiUrl}?limit=151`).subscribe((res) => {
      this.pokemonList.set(res.results);
    });
  }

  getPokemonDetailsByName(name: string) {
    return this.http.get<any>(`${this.pokeApiUrl}/${name}`);
  }

  private extractId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  loadTeam() {
    this.http.get<any[]>(this.backendUrl).subscribe({
      next: (data) => this.myTeam.set(data),
      error: (err) => console.error('Error loading team from backend:', err),
    });
  }

  addToTeam(pokemon: any) {
    const currentTeam = this.myTeam();
    const pokemonId = pokemon.id || this.extractId(pokemon.url);

    if (currentTeam.length >= 6) {
      alert('Your team is full! You can only have 6 Pokémon.');
      return;
    }

    const isDuplicate = currentTeam.some((p) => p.id === Number(pokemonId));
    if (isDuplicate) {
      alert(`${pokemon.name} is already in your team!`);
      return;
    }

    const pokemonToSave = {
      name: pokemon.name,
      id: Number(pokemonId),
      image:
        pokemon.sprites?.other['official-artwork']?.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
      types: pokemon.types?.map((t: any) => t.type.name) || [],
    };

    console.log('Sending to Backend:', pokemonToSave);

    this.http.post(this.backendUrl, pokemonToSave).subscribe({
      next: (responseFromDB: any) => {
        this.myTeam.set([...this.myTeam(), responseFromDB]);
        console.log('Successfully saved to MongoDB:', responseFromDB);
        alert(`${pokemon.name} added to your team!`);
      },
      error: (err) => {
        console.error('Save failed:', err);
        alert('Could not save to the database. Make sure your server is running on port 5000!');
      },
    });
  }

  removeFromTeam(mongoId: string) {
    this.http.delete(`http://localhost:5000/api/team/${mongoId}`).subscribe({
      next: () => {
        this.myTeam.set(this.myTeam().filter((p) => p._id !== mongoId));
      },
      error: (err) => console.error('Delete failed:', err),
    });
  }
}
