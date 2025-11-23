import express, { Request, Response } from 'express'
import cors from 'cors'

import { GetAllTitlesUseCase } from '@angular-node-electron/catalog-application'
import { InMemoryTitleRepository } from '@angular-node-electron/catalog-infrastructure'

import { GetAllMediaItemsUseCase } from '@angular-node-electron/inventory-application'
import { InMemoryMediaItemRepository } from '@angular-node-electron/inventory-infrastructure'
import { MediaItem } from '@angular-node-electron/inventory-domain'
import { MediaItemDto } from '@angular-node-electron/inventory-contract'

const mediaRepo = new InMemoryMediaItemRepository()
const getAllMediaItems = new GetAllMediaItemsUseCase(mediaRepo)

function mapMediaItemToDto(item: MediaItem): MediaItemDto {
  return {
    id: item.id.value,
    titleId: item.titleId,
    supportType: item.supportType,
    status: item.status
  }
}

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(cors({
  origin: 'http://localhost:4200'
}))

const repo = new InMemoryTitleRepository()
const getAllTitles = new GetAllTitlesUseCase(repo)

app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'angular-node-electron-backend',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      titles: '/api/catalog/titles',
      items: '/api/inventory/items'
    }
  })
})

app.get('/api/catalog/titles', async (req: Request, res: Response) => {
  const data = await getAllTitles.execute()
  res.json(data)
})

app.get('/api/inventory/items', async (req: Request, res: Response) => {
  const data = await getAllMediaItems.execute()
  const dto = data.map(mapMediaItemToDto)
  res.json(dto)
})

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})

