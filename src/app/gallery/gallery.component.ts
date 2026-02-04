import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ImageModule } from 'primeng/image';
import { RouterLink } from '@angular/router';
import { Carousel } from 'primeng/carousel';
@Component({
  selector: 'app-gallery',
  imports: [CommonModule,ImageModule,RouterLink,Carousel],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

 public images = [
      { source: 'https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg', alt: 'Shop' },
      { source: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=400', alt: 'Model' },
      { source: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=400', alt: 'Dresses' },
      { source: 'https://ginatricot-cms.imgix.net/media/cms/2025-v22/sommarshop/kla%CC%88nningar.jpg?auto=format,compress', alt: 'Summer Collection' }
    ];

    // contact.component.ts ထဲက variable ထဲမှာ ထည့်ပါ
responsiveOptions = [
  {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
  },
  {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
  }
];
projects = [
  {
    url: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=800',
    title: 'The Seraphina Gown',
    desc: 'An ethereal floor-length piece featuring hand-pleated silk tulle and delicate lace appliqués.',
    category: 'Bridal',
    material: 'Silk Tulle & Chantilly Lace',
    year: '2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800',
    title: 'Noir Midnight',
    desc: 'Architectural silhouette crafted from heavy Italian velvet with a dramatic side slit.',
    category: 'Evening Wear',
    material: 'Italian Silk Velvet',
    year: '2024'
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuCNcOMzvogsCKTig_dQ_w_h2DsTRnJhyd8Q&s',
    title: 'Pearl Essence',
    desc: 'A minimalist masterpiece with thousands of hand-sewn seed pearls on organic satin.',
    category: 'Couture',
    material: 'Organic Silk Satin',
    year: '2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800',
    title: 'Crimson Muse',
    desc: 'Bold asymmetrical draping in a striking scarlet hue, designed for high-profile galas.',
    category: 'Red Carpet',
    material: 'Double Crepe Silk',
    year: '2024'
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZNYg_H5jYCPu3c7u2MAZ81Vq1PMiG-XMjLQ&s',
    title: 'Golden Hour Wrap',
    desc: 'A sunset-inspired metallic wrap dress that catches the light with every movement.',
    category: 'Resort Wear',
    material: 'Metallic Lurex Blend',
    year: '2025'
  },
  {
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
    title: 'Vintage Rose',
    desc: 'Inspired by 1950s cinema, this tea-length dress features a corseted waist and floral embroidery.',
    category: 'Bespoke',
    material: 'Brocade & Taffeta',
    year: '2023'
  },
  {
    url: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=800',
    title: 'The Azure Cape',
    desc: 'A dramatic chiffon cape attached to a sleek, modern column dress in deep sapphire.',
    category: 'Evening Wear',
    material: 'Silk Chiffon',
    year: '2025'
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBNjrZDmXYu5kgrdKuBgmn17jS3Bv9n5toTQ&s',
    title: 'Ivory Minimalist',
    desc: 'A clean-cut, sleeveless bridal suit for the modern, non-traditional bride.',
    category: 'Bridal',
    material: 'Heavy Silk Mikado',
    year: '2024'
  },
  {
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
    title: 'Floral Cascades',
    desc: 'Three-dimensional floral patches hand-sewn onto a sheer organza base.',
    category: 'Artistic',
    material: 'Organza & Hand-Cut Petals',
    year: '2025'
  }
];
}
