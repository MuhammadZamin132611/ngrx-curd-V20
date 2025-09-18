import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MaterialModule } from '../../../../../Material.module';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, RouterLink, NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements AfterViewInit {


  @ViewChildren('tlItem') tlItems!: QueryList<ElementRef>;

  timeline = [
    {
      date: 'March 2022',
      title: 'Marketing UI design in Figma',
      desc: 'All of the pages and components are first designed in Figma...',
      icon: 'close',
      iconColor: 'bg-red-700'
    },
    {
      date: 'April 2022',
      title: 'E-Commerce UI code in Tailwind CSS',
      desc: 'Get started with dozens of web components and interactive elements...',
      icon: 'check_circle',
      iconColor: 'bg-green-700'
    }
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.tlItems.forEach((el, i) => {
      setTimeout(() => {
        this.renderer.removeClass(el.nativeElement, 'opacity-0');
        this.renderer.removeClass(el.nativeElement, 'translate-y-5');
        this.renderer.addClass(el.nativeElement, 'opacity-100');
        this.renderer.addClass(el.nativeElement, 'translate-y-0');
      }, i * 200); // stagger: 200ms delay per item
    });
  }

}
