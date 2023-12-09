import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconCircleMinus,
  IconCirclePlus,
  IconDeviceFloppy,
  IconEdit,
  IconFileDownload,
  IconFileUpload,
  IconPlayerPlayFilled,
  IconReload,
} from 'angular-tabler-icons/icons';

const icons = {
  IconFileDownload,
  IconFileUpload,
  IconEdit,
  IconCircleMinus,
  IconCirclePlus,
  IconPlayerPlayFilled,
  IconDeviceFloppy,
  IconReload,
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
