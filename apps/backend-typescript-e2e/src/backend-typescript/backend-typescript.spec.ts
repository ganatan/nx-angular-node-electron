import axios from 'axios'

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3000'

describe('GET /', () => {
  it('should return backend metadata', async () => {
    const res = await axios.get(`${BASE_URL}/`)

    expect(res.status).toBe(200)
    expect(res.data).toEqual({
      name: 'angular-node-electron-backend',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        titles: '/api/catalog/titles',
        items: '/api/inventory/items'
      }
    })
  })
})
