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

  // ❤️ Floating hearts list
  hearts = signal<FloatingHeart[]>([]);

  // 💌 Love Pop-up animation state
  lovePop = signal(false);

  // ❤️ Heart counter
  heartCount = signal(0);

  // 💑 Names
  boyName = 'KO KO';
  girlName = 'BABE';

  // 🎵 Background music (Optional: make sure the file exists in assets)
  private audio = new Audio('assets/love-music.mp3');
  private musicStarted = false;

  constructor() {
    console.log("Component Initialized. Listening to Firebase...");
    
    const heartbeatRef = ref(this.db, 'heartbeat');
    
    // 🔥 Firebase Listener
    onValue(heartbeatRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data Received:", data); 

      // data ထဲမှာ တန်ဖိုးတစ်ခုခု (ဥပမာ Timestamp) ရှိနေရင် Effect ကို run မယ်
      if (data) {
        this.triggerLoveEffects();
      }
    });
  }

  // ❤️ Button click function
  sendHeart() {
    const heartbeatRef = ref(this.db, 'heartbeat');

    // Start music on first click
   

    // 🔥 အမြဲတမ်းတန်ဖိုးအသစ်ဖြစ်နေအောင် Timestamp (Date.now()) ကို ပို့လိုက်မယ်
    set(heartbeatRef, Date.now())
      .then(() => console.log("Heartbeat sent successfully!"))
      .catch((err) => console.error("Firebase Error:", err));
  }

  // 💖 Trigger Love Effects
  private triggerLoveEffects() {
    // ၁။ Toast Notification
    this.messageService.clear();
    this.messageService.add({
      severity: 'error', // Red theme for love
      summary: 'Love Received!',
      detail: 'ချစ်သူဆီက အသည်းလေး ရောက်လာပါပြီ ❤️',
      life: 1500,
    });

    // ၂။ Counter တိုးမယ်
    this.heartCount.update((v) => v + 1);

    // ၃။ Pop-up animation text
    this.lovePop.set(true);
    setTimeout(() => this.lovePop.set(false), 1200);

    // ၄။ Floating hearts ပျံတက်စေမယ်
    for (let i = 0; i < 6; i++) {
      setTimeout(() => this.createFloatingHeart(), i * 150);
    }

    // ၅။ Vibration (Mobile devices only)
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }

  // ❤️ Floating heart generator logic
  private createFloatingHeart() {
    const id = Date.now() + Math.random();

    const newHeart: FloatingHeart = {
      id,
      left: Math.random() * 90 + 5 + '%',
      duration: (Math.random() * 2 + 3) + 's',
      size: (Math.random() * 1 + 1.5) + 'rem',
    };

    this.hearts.update((list: FloatingHeart[]) => [...list, newHeart]);

    // ၅ စက္ကန့်ကြာရင် screen ပေါ်က ဖယ်ထုတ်မယ်
    setTimeout(() => {
      this.hearts.update((list: FloatingHeart[]) => list.filter((h) => h.id !== id));
    }, 5000);
  }
}