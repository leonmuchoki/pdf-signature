import { Directive , ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

import  interact from 'interactjs';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit{
  @Input()
  model: any;

  @Input()
  options: any;

  @Output() 
  draggableClick = new EventEmitter();

  private currentlyDragged = false;

  constructor(private element: ElementRef) { }

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (!this.currentlyDragged) {
      this.draggableClick.emit();
    }
  }

  ngOnInit(): void {
    interact(this.element.nativeElement)
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        //restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: this.dragMoveListener,

      // call this function on every dragend event
      end (event) {
        
      }
    }
  })

  }

  dragMoveListener (event) : void {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

//window.dragMoveListener = this.dragMoveListener
}