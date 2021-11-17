import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { I18nService } from './services/i18n.service';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'YYG-Accounting';

  constructor(
    private i18nService: I18nService,
    private store: Store<AppState>
  ) {
    this.i18nService.init('enUS', ['enUS', 'cnCN']);
    this.i18nService.language = 'enUS';
  }
}
