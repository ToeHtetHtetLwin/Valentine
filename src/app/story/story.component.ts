import { Component, ViewChild, ElementRef, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, ButtonModule, TimelineModule, CardModule, ImageModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css',
})
export class StoryComponent implements OnInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  // State Management
  step = 1; // 1: Envelope, 2: Flowers, 3: Quiz, 4: Proposal, 5: Success, 6: Crying/No
  isOpen = false;
  selectedFlower: string | null = null;
  answer: string | null = null;
  quizStep = 0;

  // Couple Images (Using your provided links)
  coupleImages = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsho6vyroPOEm1gtapEZTt40G_y3RuU7gecA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGfwyPf00IOHKlH7MePKB17DB1ZZ-1DJ4EqA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8r75IER9DW_ilJfGN6aEZIg1VZD0xSUGkZQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIP_t-rVJyl2gsapw6f4xik9wAXNEIpxLOYA&s'
  ];

  quizQuestions = [
    {
      q: "Where did we first meet? 📍",
      options: ["At a Cafe", "At School", "Through Friends", "Online"],
      correct: "Online" 
    },
    {
      q: "What's my favorite thing to do with you? ✨",
      options: ["Watching Movies", "Long Walks", "Eating Out", "Just Talking"],
      correct: "Just Talking"
    }
  ];

  countdownText = signal({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  private timerInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.startCountdown();
  }

  openEnvelope() {
    this.isOpen = true;
    setTimeout(() => { this.step = 2; }, 2500);
  }

  selectFlower(flower: string) {
    this.selectedFlower = flower;
    this.step = 3;
  }

  checkQuiz(option: string) {
    if (option === this.quizQuestions[this.quizStep].correct) {
      if (this.quizStep < this.quizQuestions.length - 1) {
        this.quizStep++;
      } else {
        this.step = 4;
      }
    } else {
      alert("Try again, my love! I know you know this... 😜");
    }
  }

  onResponse(res: string) {
    this.answer = res;
    if (res === 'yes') {
      this.step = 5;
      this.launchConfetti();
    } else {
      this.step = 6; // Show Crying Screen
    }
  }

  launchConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#fb7185']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e11d48', '#fb7185']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  tryAgain() {
    this.step = 4;
    this.answer = null;
  }

  private startCountdown() {
    const vDate = new Date('February 14, 2026 00:00:00').getTime();
    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const dist = vDate - now;
      this.countdownText.set({
        days: Math.floor(dist / (1000 * 60 * 60 * 24)),
        hours: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((dist % (1000 * 60)) / 1000)
      });
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
}