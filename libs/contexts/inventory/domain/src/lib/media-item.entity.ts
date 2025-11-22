export type MediaSupportType = 'DVD' | 'BLURAY' | 'BLURAY_4K';
export type MediaStatus =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'SOLD'
  | 'DAMAGED'
  | 'LOST';

export class MediaItemId {
  constructor(readonly value: string) {
    if (!value) {
      throw new Error('MediaItemId cannot be empty');
    }
  }
}

export class MediaItem {
  constructor(
    readonly id: MediaItemId,
    readonly titleId: string,
    readonly supportType: MediaSupportType,
    readonly status: MediaStatus
  ) {}

  withStatus(status: MediaStatus): MediaItem {
    return new MediaItem(this.id, this.titleId, this.supportType, status);
  }
}
