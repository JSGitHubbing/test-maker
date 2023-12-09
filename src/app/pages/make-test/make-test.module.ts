import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeTestRoutingModule } from './make-test-routing.module';
import { MakeTestComponent } from './make-test.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MakeTestComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MakeTestRoutingModule, ComponentsModule],
})
export class MakeTestModule {}
