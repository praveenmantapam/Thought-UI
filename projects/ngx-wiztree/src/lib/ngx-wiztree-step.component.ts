import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxWiztreeStep } from './ngx-wiztree.model';

@Component({
  selector: 'ngx-wiztree-step',
  templateUrl: 'ngx-wiztree-step.component.html',
  styleUrls: ['ngx-wiztree.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxWiztreeStepComponent implements OnInit, AfterViewInit, AfterContentChecked {

  @Input('model') public stepModel: NgxWiztreeStep = {};
  @Input('cmpId') public cmpId: string = '';
  @Input('cmpParentId') public cmpParentId: string = '';

  constructor(private cdRef: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  public ngAfterViewInit(): void {

  }

  public ngOnInit(): void {

  }
}
