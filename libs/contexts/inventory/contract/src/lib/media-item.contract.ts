export type MediaSupportTypeDto = 'DVD' | 'BLURAY' | 'BLURAY_4K';
export type MediaStatusDto =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'SOLD'
  | 'DAMAGED'
  | 'LOST';

export interface MediaItemDto {
  id: string;
  titleId: string;
  supportType: MediaSupportTypeDto;
  status: MediaStatusDto;
}
