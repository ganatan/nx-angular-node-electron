import { TitleRepository } from '@angular-node-electron/catalog-domain';
import { TitleDto } from '@angular-node-electron/catalog-contract';

export class GetAllTitlesUseCase {
  constructor(private readonly repository: TitleRepository) {}

  async execute(): Promise<TitleDto[]> {
    const entities = await this.repository.findAll();
    return entities.map((e) => ({
      id: e.id,
      name: e.name,
      year: e.year,
    }));
  }
}
