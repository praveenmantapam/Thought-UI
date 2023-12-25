import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxWiztreeComponent } from './ngx-wiztree.component';
import { NgxWiztreeStepComponent } from './ngx-wiztree-step.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NgxWiztreeComponent,
    NgxWiztreeStepComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxWiztreeComponent,
    NgxWiztreeStepComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class NgxWiztreeModule { }
