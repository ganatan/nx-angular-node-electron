'use strict'

const { app, BrowserWindow } = require('electron')
const path = require('path')

const { WebSocketServer } = require('ws')

require('dotenv').config()

function getRootPath() {
  return path.join(__dirname, '..', '..', '..')
}

function startBackend() {
  const rootPath = getRootPath()
  const backendMainPath = path.join(
    rootPath,
    'dist',
    'apps',
    'backend-typescript',
    'main.js'
  )

  console.log('[MAIN] require backend:', backendMainPath)
  require(backendMainPath)
}

function startWebSocketServer() {
  console.log('WebSocketServer sur le port 8080')
  const wss = new WebSocketServer({ port: 8080 })

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
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

  console.log('00000000001:' + process.env.MODE)
  // const html = true;
  const html = (process.env.MODE === 'html');
  if (html) {
    const indexHtmlPath = path.join(
      __dirname,
      '.',
      'renderer',
      'index.html'
    )
    win.loadFile(indexHtmlPath);
  } else {

    const indexHtmlPath = path.join(
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
    win.loadFile(indexHtmlPath);
  }

  if (process.env.NODE_ENV === 'development') {
    if (process.env.DEVTOOLS === 'true') {
      win.webContents.openDevTools()
    }
  }
}

app.whenReady().then(() => {
  const html = (process.env.MODE === 'html');
  if (!html) {
    startBackend();
  }
  startWebSocketServer();
  createWindow();
})