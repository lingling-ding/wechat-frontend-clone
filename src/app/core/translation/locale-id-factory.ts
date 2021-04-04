import { TranslateService } from '@ngx-translate/core';

export const localeIdFactory = (translateService: TranslateService): string => `${translateService.currentLang || 'en'}-CH`;
