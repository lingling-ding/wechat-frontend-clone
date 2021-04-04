import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatsPage } from './chats.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ChatsPageRoutingModule } from './chats-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ChatsPageRoutingModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
