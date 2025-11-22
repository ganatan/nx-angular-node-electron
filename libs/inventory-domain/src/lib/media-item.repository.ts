import { MediaItemEntity } from "./media-item.entity"

export interface MediaItemRepository {
  findAll(): Promise<MediaItemEntity[]>
}
