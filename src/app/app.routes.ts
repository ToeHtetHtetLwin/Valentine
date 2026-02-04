import { Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { StoryComponent } from './story/story.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'home', component: GalleryComponent },
  { path: 'story', component: StoryComponent },
  { path: 'contact', component: ContactComponent },
];
