import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appFallbackImg]',
  standalone: true,
})
export class FallbackImgDirective {
  @Input() appFallbackImg = 'assets/img/galaxy-book.svg';

  @HostListener('error', ['$event'])
  onError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.appFallbackImg) {
      img.src = this.appFallbackImg;
    }
  }
}
