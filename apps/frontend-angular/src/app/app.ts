import { Component, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Catalog } from '@angular-node-electron/catalog';

import { HttpClient } from '@angular/common/http'

import { TitleDto } from '@angular-node-electron/catalog-contract'
import { MediaItemDto } from '@angular-node-electron/inventory-contract';

@Component({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    Catalog
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'frontend-angular';

  private readonly http = inject(HttpClient)

  // useMock = environment.useMock;
  useMock = false;
  messages: { from: 'user' | 'bot', content: string }[] = [];
  message = '';
  ws?: WebSocket;
  connected = false;
  wsStatus = 'Déconnecté';
  notification = '';

  titles: TitleDto[] = []
  mediaItems: MediaItemDto[] = []

  loadingTitles = false
  loadingMediaItems = false
  backendError = ''

  ngOnInit() {
    if (!this.useMock) {
      this.connectWS();
    }
  }

  connectWS() {
    this.ws = new WebSocket('ws://localhost:8080');
    this.ws.onopen = () => {
      this.connected = true;
      this.wsStatus = 'Connecté';
      this.notification = 'WebSocket prêt';
    };
    this.ws.onclose = () => {
      this.connected = false;
      this.wsStatus = 'Déconnecté';
      this.notification = 'WebSocket déconnecté';
    };
    this.ws.onerror = (err) => {
      console.error('WebSocket erreur', err);
      this.notification = 'Erreur WebSocket';
    };
    this.ws.onmessage = (msg) => {
      this.addMessage('bot', msg.data);
      this.notification = 'Réponse reçue du serveur';
    };
  }

  sendMessage() {
    const content = this.message.trim();
    if (!content) return;
    this.addMessage('user', content);
    this.message = '';

    if (this.useMock) {
      setTimeout(() => {
        this.addMessage('bot', `Réponse mockée à "${content}"`);
        this.notification = 'Réponse simulée reçue';
      }, 500);
    } else if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(content);
      this.notification = 'Message envoyé';
    } else {
      this.notification = 'WebSocket non connecté';
    }
  }

  testWS() {
    if (this.useMock) {
      this.notification = 'Mode mock activé, pas de test réel';
    } else if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send('Test de message');
      this.notification = 'Test de message envoyé';
    } else {
      this.notification = 'WebSocket non connecté';
    }
  }

  private addMessage(from: 'user' | 'bot', content: string) {
    this.messages.push({ from, content });
    setTimeout(() => {
      const container = document.querySelector('.flex-grow-1.overflow-auto');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 0);
  }

  testBackend() {
    this.loadingTitles = true
    this.backendError = ''
    this.http.get<TitleDto[]>('http://localhost:3000/api/catalog/titles').subscribe({
      next: data => {
        this.titles = data
        this.loadingTitles = false
      },
      error: () => {
        this.backendError = 'Erreur lors de l’appel backend'
        this.loadingTitles = false
      }
    })
    this.loadingMediaItems = true
    this.backendError = ''
    this.http.get<MediaItemDto[]>('http://localhost:3000/api/inventory/items').subscribe({
      next: data => {
        this.mediaItems = data
        this.loadingMediaItems = false
      },
      error: () => {
        this.backendError = 'Erreur lors de l’appel backend'
        this.loadingMediaItems = false
      }
    })
  }

}
