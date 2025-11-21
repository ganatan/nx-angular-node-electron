import { TitleEntity } from "./title.entity"

export interface TitleRepository {
  findAll(): Promise<TitleEntity[]>
}
