import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CategoryItemModule } from './components/category-item/category-item.module';
import { CategoryLinkModule } from './components/category-link/category-link.module';
import { CategoryDetailsModule } from './components/category-details/category-details.module';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CategoryItemModule,
    CategoryLinkModule,
    CategoryDetailsModule,
    MatSnackBarModule,
  ],
  exports: [DashboardComponent],
  providers: [NotificationsService],
})
export class DashboardModule {}
