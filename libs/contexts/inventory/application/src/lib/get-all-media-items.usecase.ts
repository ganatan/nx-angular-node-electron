import { MediaItem } from '@angular-node-electron/inventory-domain';
import { MediaItemRepository } from '@angular-node-electron/inventory-domain';

export class GetAllMediaItemsUseCase {
  constructor(private readonly repo: MediaItemRepository) {}

  execute(): Promise<MediaItem[]> {
    return this.repo.findAll();
  }
}
