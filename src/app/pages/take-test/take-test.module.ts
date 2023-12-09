import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TakeTestRoutingModule } from './take-test-routing.module';
import { TakeTestComponent } from './take-test.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { IconsModule } from 'src/app/modules/icons/icons.module';

@NgModule({
  declarations: [TakeTestComponent],
  imports: [CommonModule, TakeTestRoutingModule, ComponentsModule, IconsModule],
})
export class TakeTestModule {}
