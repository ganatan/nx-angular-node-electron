import {
  MediaItem,
  MediaItemId,
  MediaSupportType,
  MediaStatus,
  MediaItemRepository,
} from '@angular-node-electron/inventory-domain';

export class InMemoryMediaItemRepository implements MediaItemRepository {
  private readonly items: MediaItem[];

  constructor() {
    this.items = [
      new MediaItem(new MediaItemId('1'), 'Alien', 'DVD', 'AVAILABLE'),
      new MediaItem(
        new MediaItemId('2'),
        'Blade Runner',
        'BLURAY',
        'RESERVED'
      ),
      new MediaItem(
        new MediaItemId('3'),
        'Gladiator',
        'BLURAY_4K',
        'SOLD'
      ),
      new MediaItem(
        new MediaItemId('4'),
        'Kingdom of Heaven',
        'BLURAY_4K',
        'SOLD'
      ),
    ];
  }

  async findAll(): Promise<MediaItem[]> {
    return this.items;
  }
}
