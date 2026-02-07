import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, set, onValue } from '@angular/fire/database';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface FloatingHeart {
  id: number;
  left: string;
  duration: string;
  size: string;
}

@Component({
  selector: 'app-new-valentine',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './new-valentine.component.html',
  styleUrl: './new-valentine.component.css',
})
export class NewValentineComponent {
  private db = inject(Database);
  private messageService = inject(MessageService);

  // ❤️ Floating hearts
  hearts = signal<FloatingHeart[]>([]);

  // 💌 Love Sent animation text
  lovePop = signal(false);

  // ❤️ Heart counter
  heartCount = signal(0);

  // 💑 Couple names (Personalize here)
  boyName = 'KO KO';
  girlName = 'BABE';

  // 🎵 Background music
  private audio = new Audio('assets/love-music.mp3');
  private musicStarted = false;

  constructor() {
    const heartbeatRef = ref(this.db, 'heartbeat');

    // Firebase listener
    onValue(heartbeatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.triggerLoveEffects();
      }
    });
  }

  // ❤️ Button click
  sendHeart() {
    const heartbeatRef = ref(this.db, 'heartbeat');

    // Start music after first click (browser rule)
    if (!this.musicStarted) {
      this.audio.loop = true;
      this.audio.play().catch(() => {});
      this.musicStarted = true;
    }

    // Always new value
    set(heartbeatRef, Date.now());
  }

  // 💖 Trigger Effects
  private triggerLoveEffects() {
    // Toast
    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Love Received!',
      detail: 'ချစ်သူဆီက အသည်းလေး ရောက်လာပါပြီ ❤️',
      life: 1500,
    });

    // Increase counter
    this.heartCount.update((v) => v + 1);

    // Love Sent animation
    this.lovePop.set(true);
    setTimeout(() => this.lovePop.set(false), 1200);

    // Floating hearts
    for (let i = 0; i < 6; i++) {
      setTimeout(() => this.createFloatingHeart(), i * 150);
    }

    // Vibration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }

  // ❤️ Floating heart generator
  private createFloatingHeart() {
    const id = Date.now() + Math.random();

    const newHeart: FloatingHeart = {
      id,
      left: Math.random() * 90 + 5 + '%',
      duration: Math.random() * 2 + 3 + 's',
      size: Math.random() * 1 + 1.5 + 'rem',
    };

    this.hearts.update((list) => [...list, newHeart]);

    setTimeout(() => {
      this.hearts.update((list) => list.filter((h) => h.id !== id));
    }, 5000);
  }
}
