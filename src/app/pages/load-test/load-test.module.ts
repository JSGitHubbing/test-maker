import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadTestRoutingModule } from './load-test-routing.module';
import { LoadTestComponent } from './load-test.component';

@NgModule({
  declarations: [LoadTestComponent],
  imports: [CommonModule, LoadTestRoutingModule],
})
export class LoadTestModule {}
