import {
  Title,
  TitleRepository,
} from '@angular-node-electron/catalog-domain';

export class InMemoryTitleRepository implements TitleRepository {
  private readonly items: Title[] = [
    new Title('1', 'Alien', 1979),
    new Title('2', 'Blade Runner', 1982),
    new Title('3', 'Gladiator', 2000),
    new Title('4', 'Kingdom of Heaven', 2005),
  ];

  async findAll(): Promise<Title[]> {
    return this.items;
  }
}
