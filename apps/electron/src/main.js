'use strict'

const { app, BrowserWindow } = require('electron')
const path = require('path')
const { WebSocketServer } = require('ws')
require('dotenv').config()

const FRONTEND_ENABLED = process.env.FRONTEND_ENABLED === 'true'
const BACKEND_ENABLED = process.env.BACKEND_ENABLED === 'true'
const DEVTOOLS_ENABLED = process.env.DEVTOOLS_ENABLED === 'true'

function startBackend() {
  if (!BACKEND_ENABLED) {
    return
  }

  const backendPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'dist',
    'apps',
    'backend-typescript',
    'main.js'
  )

  console.log('[MAIN] require backend:', backendPath)
  require(backendPath)
}

function startWebSocketServer() {
  console.log('WebSocketServer sur le port 8080')
  const wss = new WebSocketServer({ port: 8080 })

  wss.on('connection', ws => {
    ws.on('message', message => {
      ws.send(`Réponse du serveur : vous avez dit "${message.toString()}"`)
    })
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false
    }
  })

  console.log('[MAIN] FRONTEND_ENABLED:', FRONTEND_ENABLED)

  const indexHtmlPath = FRONTEND_ENABLED
    ? path.join(
        __dirname,
        '..',
        '..',
        '..',
        'dist',
        'apps',
        'frontend-angular',
        'browser',
        'index.html'
      )
    : path.join(__dirname, 'renderer', 'index.html')

  win.loadFile(indexHtmlPath)

  if (process.env.NODE_ENV === 'development' && DEVTOOLS_ENABLED) {
    win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  startBackend()
  startWebSocketServer()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

