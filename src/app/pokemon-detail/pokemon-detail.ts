import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonapiService } from '../services/pokemonapi-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public pokeService = inject(PokemonapiService);

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');

    if (name) {
      this.pokeService.getPokemonDetailsByName(name).subscribe({
        next: (data) => {
          this.pokeService.selectedPokemon.set(data);
        },
        error: (err) => {
          console.error('Failed to load Pokémon stats', err);
        },
      });
    }
  }

  searchPokemon() {
    const query = this.pokeService.searchTerm().toLowerCase();
    if (query) {
      this.pokeService.selectedPokemon.set(null);
      this.router.navigate(['/details', query]);
      this.pokeService.getPokemonDetailsByName(query).subscribe((data) => {
        this.pokeService.selectedPokemon.set(data);
      });
    }
  }
}
