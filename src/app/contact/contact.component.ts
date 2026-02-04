import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    Textarea,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
 
 public formData = {
    name: '',
    email: '',
    reason: '',
    message: '',
  };

  loading: boolean = false;
  submitted: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
    const formspreeUrl = 'https://formspree.io/f/mojlnkld';

    this.http.post(formspreeUrl, this.formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.submitted = true; 
        this.formData = { name: '', email: '', reason: '', message: '' }; 
      },
      error: (error) => {
        this.loading = false;
        alert('Can not sent message.Try again Later');
      },
    });
  }
}
