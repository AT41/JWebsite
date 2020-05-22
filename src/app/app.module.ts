import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { UsersLibModule } from './shared/users-lib/users-lib.module';
import { ToolbarModule } from './shared/toolbar/toolbar.module';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FlashcardsModule } from './test-creator/flashcards.module';
import { FlashcardTestingModule } from './flashcard-testing/flashcard-testing.module';
import { CustomCreatorModule } from './custom-creator/custom-creator.module';

@NgModule({
  declarations: [AppComponent, HomepageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    UsersLibModule,
    BrowserAnimationsModule,
    ToolbarModule,
    FlashcardsModule,
    FlashcardTestingModule,
    CustomCreatorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, ToolbarComponent]
})
export class AppModule {}
