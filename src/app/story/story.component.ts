import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import confetti from 'canvas-confetti';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-story',
  imports: [CommonModule, ButtonModule, TimelineModule, CardModule, ImageModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css',
})
export class StoryComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  started = false;
  isPlaying = false;
  responseSent = false;
  isSubmitting = false;
  finalMessage = '';

  private formspreeEndpoint = 'https://formspree.io/f/xeeljapb';

  constructor(private http: HttpClient) {}

  isOpen = false;

  openEnvelope() {
    this.isOpen = !this.isOpen;
  }

  startExperience() {
    this.started = true;
    setTimeout(() => {
      this.audioPlayer.nativeElement
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((err) => console.log('Audio play blocked by browser'));
    }, 300);
  }

  toggleMusic() {
    if (this.isPlaying) this.audioPlayer.nativeElement.pause();
    else this.audioPlayer.nativeElement.play();
    this.isPlaying = !this.isPlaying;
  }

  // ... inside the class
  onResponse(answer: string) {
    this.isSubmitting = true;
    this.http
      .post(this.formspreeEndpoint, {
        answer,
        time: new Date().toLocaleString(),
        note: 'Perfect Song Confession - English Version',
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.responseSent = true;
          if (answer == 'Yes') {
            this.triggerConfetti();
            this.finalMessage =
              "Thank you for making me the luckiest person! ❤️ I can't wait to spend this Valentine's with you.";
          } else {
            this.finalMessage =
              'I truly respect your decision. Thank you for being part of my journey. 😊';
          }
        },
      });
  }
  // ...

  triggerConfetti() {
    const end = Date.now() + 3 * 1000;
    const colors = ['#ff0000', '#ff69b4', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
}
