import {
  MediaItemEntity,
  MediaItemId,
  MediaSupportType,
  MediaStatus,
  MediaItemRepository
} from '@angular-node-electron/inventory-domain'

export class InMemoryMediaItemRepository implements MediaItemRepository {
  private readonly items: MediaItemEntity[]

  constructor() {
    this.items = [
      new MediaItemEntity(new MediaItemId('1'), 'Alien', 'DVD', 'AVAILABLE'),
      new MediaItemEntity(new MediaItemId('2'), 'Blade Runner', 'BLURAY', 'RESERVED'),
      new MediaItemEntity(new MediaItemId('3'), 'Gladiator', 'BLURAY_4K', 'SOLD'),
      new MediaItemEntity(new MediaItemId('4'), 'Kingdom of Heaven', 'BLURAY_4K', 'SOLD'),
    ]
  }

  async findAll(): Promise<MediaItemEntity[]> {
    return this.items
  }
}
