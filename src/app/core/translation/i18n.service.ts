import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FALLBACK_LANGUAGE, Language } from './languages.constants';
import { CoreState, getCurrentLanguage } from '@app/state/core';
import { LanguageChangedAction, LanguageInitializedAction } from '@app/actions/core';
import { Storage } from '@capacitor/core';
import { STORAGE_KEYS } from '@app/enums/storage-keys';

export const LANGUAGE_KEY = STORAGE_KEYS.LANGUAGE;

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  public readonly currentLanguage$: Observable<Language>;

  constructor(private translateService: TranslateService, private store: Store<CoreState>) {
    this.currentLanguage$ = this.store.pipe(select(getCurrentLanguage));
  }

  /**
   * A function is meant to run in the beginning of the application
   */
  async init(): Promise<void> {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(FALLBACK_LANGUAGE);
    const currentLanguage = await this.getAppDefaultLanguage();
    await this.saveLanguageInPersistentMemory(currentLanguage);
    this.translateService.use(currentLanguage);
    this.store.dispatch(new LanguageInitializedAction({ language: currentLanguage }));
  }

  /**
   * Changes the current language of the application and saves in the persistent memory
   */
  async changeLanguage(language: Language): Promise<void> {
    await this.saveLanguageInPersistentMemory(language);
    this.translateService.use(language);
    this.store.dispatch(new LanguageChangedAction({ language }));
  }

  stream(key: string | Array<string>, interpolateParams?: any): Observable<string | any> {
    return this.translateService.stream(key, interpolateParams);
  }

  instant(key: string | Array<string>, interpolateParams?: any): string {
    return this.translateService.instant(key, interpolateParams);
  }

  private async isLanguagePersisted(): Promise<boolean> {
    return !!await Storage.get({ key: LANGUAGE_KEY });
  }

  private async saveLanguageInPersistentMemory(language: Language): Promise<void> {
    await Storage.set({key: LANGUAGE_KEY, value: language});
  }

  private async getPersistentLanguage(): Promise<Language | null> {
    return await this.isLanguagePersisted() ? (localStorage.getItem(LANGUAGE_KEY) as Language) : null;
  }

  private isValid(language: Language): boolean {
    return Object.values(Language).includes(language);
  }

  private async getAppDefaultLanguage(): Promise<Language> {
    const defaultLanguage = await this.isLanguagePersisted()
      ? await this.getPersistentLanguage()
      : (this.translateService.getBrowserLang() as Language);
    return this.isValid(defaultLanguage) ? defaultLanguage : FALLBACK_LANGUAGE;
  }
}
