export type MediaSupportType = 'DVD' | 'BLURAY' | 'BLURAY_4K'
export type MediaStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'DAMAGED' | 'LOST'

export class MediaItemId {
  constructor(readonly value: string) {
    if (!value) {
      throw new Error('MediaItemId cannot be empty')
    }
  }
}

export class MediaItemEntity {
  constructor(
    readonly id: MediaItemId,
    readonly titleId: string,
    readonly supportType: MediaSupportType,
    readonly status: MediaStatus
  ) {}

  withStatus(status: MediaStatus): MediaItemEntity {
    return new MediaItemEntity(this.id, this.titleId, this.supportType, status)
  }
}
