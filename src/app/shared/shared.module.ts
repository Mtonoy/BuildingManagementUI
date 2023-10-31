import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResponsiveHelperComponent, ClickOutsideDirective],
  imports: [CommonModule],
  exports: [ResponsiveHelperComponent, ClickOutsideDirective],
})
export class SharedModule {}
