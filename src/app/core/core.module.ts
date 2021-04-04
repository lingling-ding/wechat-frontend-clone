import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { createTranslateLoader } from './translation/translation-loader';
import { HttpClient } from '@angular/common/http';
import { localeIdFactory } from './translation/locale-id-factory';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: localeIdFactory,
      deps: [TranslateService],
    },
  ],
})
export class CoreModule { }
