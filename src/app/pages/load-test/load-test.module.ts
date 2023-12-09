import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadTestRoutingModule } from './load-test-routing.module';
import { LoadTestComponent } from './load-test.component';
import { IconsModule } from 'src/app/modules/icons/icons.module';

@NgModule({
  declarations: [LoadTestComponent],
  imports: [CommonModule, LoadTestRoutingModule, IconsModule],
})
export class LoadTestModule {}
