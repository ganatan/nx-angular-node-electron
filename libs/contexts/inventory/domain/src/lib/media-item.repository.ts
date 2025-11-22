import { MediaItem } from './media-item.entity';

export interface MediaItemRepository {
  findAll(): Promise<MediaItem[]>;
}
