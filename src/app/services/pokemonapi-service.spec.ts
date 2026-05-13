import { TestBed } from '@angular/core/testing';

import { PokemonapiService } from './pokemonapi-service';

describe('PokemonapiService', () => {
  let service: PokemonapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
