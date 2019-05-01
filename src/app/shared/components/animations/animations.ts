import { animate, state, style, transition, trigger } from '@angular/animations';


export const slideTitleRightTrigger = trigger('slideTitleRight', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
    }),
    animate('2s ease-in-out', style({transform: 'translateX(0)'}))
  ])
]);

export const slideTitleLeftTrigger = trigger('slideTitleLeft', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
    }),
    animate('2s ease-in-out', style({transform: 'translateX(0)'}))
  ])
]);

export const growImgTrigger = trigger('growImg', [
  transition(':enter', [
    style({
      transform: 'scale(0.6)',
      opacity: 0,
    }),
    animate('2s linear', style({
      transform: 'scale(1.0)',
      opacity: 1,
    }))
  ])
]);