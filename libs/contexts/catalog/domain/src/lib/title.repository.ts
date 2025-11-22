import { Title } from './title.entity';

export interface TitleRepository {
  findAll(): Promise<Title[]>;
}
