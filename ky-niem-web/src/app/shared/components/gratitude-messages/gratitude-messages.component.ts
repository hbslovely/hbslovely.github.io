import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

@Component({
  selector: 'app-gratitude-messages',
  templateUrl: './gratitude-messages.component.html',
  styleUrls: ['./gratitude-messages.component.scss']
})
export class GratitudeMessagesComponent implements OnInit, AfterViewInit {
  private swiper: Swiper | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    this.swiper = new Swiper('.swiper-container', {
      modules: [Navigation, Pagination, EffectFade],
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }
} 