import { Component, inject, signal, NgZone, effect } from '@angular/core';
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
  private zone = inject(NgZone);

  // States
  hearts = signal<FloatingHeart[]>([]);
  lovePop = signal(false);
  heartCount = signal(0);
  
  // Firebase ကလာတဲ့ data ကို သိမ်းမယ့် Signal
  firebaseHeartbeat = signal<number | null>(null);

  boyName = 'KO KO';
  girlName = 'BABE';

  constructor() {
    const heartbeatRef = ref(this.db, 'heartbeat');

    // 🔥 Firebase Listener: အခြား device ကပို့လိုက်ရင် ဒါက အလုပ်လုပ်မယ်
    onValue(heartbeatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Angular Zone ထဲမှာ run မှ UI က ချက်ချင်း Update ဖြစ်မှာပါ
        this.zone.run(() => {
          this.firebaseHeartbeat.set(data);
        });
      }
    });

    // ⚡ Signal Effect: firebaseHeartbeat တန်ဖိုးပြောင်းတာနဲ့ Animation တွေကို Trigger လုပ်မယ်
    effect(() => {
      if (this.firebaseHeartbeat()) {
        this.triggerLoveEffects();
      }
    }, { allowSignalWrites: true });
  }

  // ❤️ ပို့တဲ့ function
  sendHeart() {
    const heartbeatRef = ref(this.db, 'heartbeat');
    // Firebase ထဲကို value အသစ် (Timestamp) ထည့်လိုက်မယ်
    set(heartbeatRef, Date.now()).catch((err) => console.error("Firebase Error:", err));
  }

  private triggerLoveEffects() {
    // ၁။ Toast Notification ပြမယ်
    this.messageService.clear();
    this.messageService.add({
      severity: 'success', 
      summary: 'Love Received!',
      detail: 'ချစ်သူဆီက အသည်းလေး ရောက်လာပါပြီ ❤️ကိုယ် မင်းကိုလွမ်းတယ်🥹',
      life: 2000,
    });

    // ၂။ Counter တိုးမယ်
    this.heartCount.update((v) => v + 1);

    // ၃။ Pop-up text
    this.lovePop.set(true);
    setTimeout(() => this.lovePop.set(false), 1200);

    // ၄။ အသည်းလေးတွေ ပျံတက်မယ်
    for (let i = 0; i < 6; i++) {
      setTimeout(() => this.createFloatingHeart(), i * 150);
    }

    // ၅။ Vibration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }

  private createFloatingHeart() {
    const id = Date.now() + Math.random();
    const newHeart: FloatingHeart = {
      id,
      left: Math.random() * 90 + 5 + '%',
      duration: (Math.random() * 2 + 3) + 's',
      size: (Math.random() * 1 + 1.5) + 'rem',
    };

    this.hearts.update((list) => [...list, newHeart]);
    setTimeout(() => {
      this.hearts.update((list) => list.filter((h) => h.id !== id));
    }, 5000);
  }
}