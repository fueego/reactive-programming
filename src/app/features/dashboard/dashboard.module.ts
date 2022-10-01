import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CategoryItemModule } from './components/category-item/category-item.module';
import { CategoryLinkModule } from './components/category-link/category-link.module';
import { CategoryDetailsModule } from './components/category-details/category-details.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CategoryItemModule,
    CategoryLinkModule,
    CategoryDetailsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
