import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FlashcardsModule } from './test-creator/flashcards.module';
import { FlashcardTestingModule } from './flashcard-testing/flashcard-testing.module';
import { CustomCreatorModule } from './custom-creator/custom-creator.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomepageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlashcardsModule,
    FlashcardTestingModule,
    CustomCreatorModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent, ToolbarComponent]
})
export class AppModule {}
