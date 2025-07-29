import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { GratitudeMessagesComponent } from './shared/components/gratitude-messages/gratitude-messages.component';

// Import Swiper styles in your styles.scss instead of here

@NgModule({
  declarations: [
    AppComponent,
    GratitudeMessagesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 