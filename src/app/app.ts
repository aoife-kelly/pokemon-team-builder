import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonList } from './pokemon-list/pokemon-list';
import { NavbarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PokemonList, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokemon-team-builder');
}
