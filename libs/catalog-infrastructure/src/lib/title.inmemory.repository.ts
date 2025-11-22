import { TitleEntity, TitleRepository } from '@angular-node-electron/catalog-domain'

export class InMemoryTitleRepository implements TitleRepository {
  private readonly items: TitleEntity[] = [
    new TitleEntity('1', 'Alien', 1979),
    new TitleEntity('2', 'Blade Runner', 1982),
    new TitleEntity('3', 'Gladiator', 2000),
    new TitleEntity('4', 'Kingdom of Heaven', 2005),
  ]

  async findAll(): Promise<TitleEntity[]> {
    return this.items
  }
}
