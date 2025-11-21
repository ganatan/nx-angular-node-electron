import { TitleEntity, TitleRepository } from '@angular-node-electron/catalog-domain'

export class InMemoryTitleRepository implements TitleRepository {
  private readonly items: TitleEntity[] = [
    new TitleEntity('1', 'Heat', 1995),
    new TitleEntity('2', 'The Insider', 1999),
    new TitleEntity('3', 'Collateral', 2004)
  ]

  async findAll(): Promise<TitleEntity[]> {
    return this.items
  }
}
