import express, { Request, Response } from 'express'
import cors from 'cors'
import { GetAllTitlesUseCase } from '@angular-node-electron/catalog-application'
import { InMemoryTitleRepository } from '@angular-node-electron/catalog-infrastructure'

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
    date: '2025-11-22 07-31',
    status: 'running',
    endpoints: {
      titles: '/api/catalog/titles'
    }
  })
})

app.get('/api/catalog/titles', async (req: Request, res: Response) => {
  const data = await getAllTitles.execute()
  res.json(data)
})

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})


// import express, { Request, Response } from 'express'
// import { GetAllTitlesUseCase } from '@angular-node-electron/catalog-application'
// import { InMemoryTitleRepository } from '@angular-node-electron/catalog-infrastructure'

// const app = express()
// const port = process.env.PORT ? Number(process.env.PORT) : 3333

// const repo = new InMemoryTitleRepository()
// const getAllTitles = new GetAllTitlesUseCase(repo)

// app.get('/api/catalog/titles', async (req: Request, res: Response) => {
//   const data = await getAllTitles.execute()
//   res.json(data)
// })

// app.listen(port, () => {
//   console.log(`Backend listening on http://localhost:${port}`)
// })


// import express from 'express';

// const host = process.env.HOST ?? 'localhost';
// const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// const app = express();

// app.get('/', (req, res) => {
//   res.send({ message: 'Hello API' });
// });

// app.get('/directors', (req, res) => {
//   res.send([
//     { firstName: 'Steven', lastName: 'Spielberg', birthDate: '1946-12-18' },
//     { firstName: 'Martin', lastName: 'Scorsese', birthDate: '1942-11-17' },
//     { firstName: 'Quentin', lastName: 'Tarantino', birthDate: '1963-03-27' },
//     { firstName: 'Christopher', lastName: 'Nolan', birthDate: '1970-07-30' },
//     { firstName: 'James', lastName: 'Cameron', birthDate: '1954-08-16' },
//     { firstName: 'David', lastName: 'Fincher', birthDate: '1962-08-28' },
//     { firstName: 'Clint', lastName: 'Eastwood', birthDate: '1930-05-31' }
//   ]);
// });


// app.listen(port, host, () => {
//   console.log(`[ ready ] http://${host}:${port}`);
// });
