import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-bagan',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './bagan.component.html',
  styleUrls: ['./bagan.component.css'],
})
export class BaganComponent {
  currentIndex = signal(0);

  pages = [
    {
      image: 'book.jpg',
      title: 'မြ​ကျေးရုံတို.ပုဂံ​ရွှေပြည်',
      text: 'Where the sun kisses the ancient gold.',
    },
    {
      image: '1.jpg',
      title: 'မြ​ကျေးရုံတို. ပုဂံ​ရွှေပြည်',
      text: 'မမ မမကကျန်စစ်သားလား,မမက ကျွန်​တော့်မျက်ရည်ကိုလည်းသုတ်​ပေးတယ်',
    },
    {
      image: '2.jpg',
      title: 'မြ​ကျေးရုံတို. ပုဂံ​ရွှေပြည်',
      text: 'မမက မုန့်လဲ၀ယ်​ကျွေးတယ်',
    },
    {
      image: '3.jpg',
      title: 'မြ​ကျေးရုံတို. ပုဂံ​ရွှေပြည်',
      text: 'အ၀တ်အစားလဲ၀ယ်​ပေးတယ်​လေ',
    },
    {
      image: '4.jpg',
      title: 'မြ​ကျေးရုံတို. ပုဂံ​ရွှေပြည်',
      text: 'အေးပါ မမ ကကျန်စစ်သားလည်းဟုတ်တယ် ကြက်ဥလည်းလုပ်ပါ့မယ်',
    },
    {
      image: '5.jpg',
      title: 'မြ​ကျေးရုံတို. ပုဂံ​ရွှေပြည်',
      text: 'မောင်​လေးမမတိုအိမ်လိုက်ခဲ့​နော်',
    },

    {
      image: '7.jpg',
      title: 'မြ​ကျေးရုံတို. ပုဂံ​ရွှေပြည်',
      text: '',
    },
  ];

  nextPage() {
    this.currentIndex.set((this.currentIndex() + 1) % this.pages.length);
  }
}
