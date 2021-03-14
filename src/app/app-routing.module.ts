import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FlashcardMainComponent } from './test-creator/flashcard-main/flashcard-main.component';
import { MainTesterComponent } from './flashcard-testing/main-tester/main-tester.component';
import { CustomCreatorComponent } from './custom-creator/custom-creator.component';

const routes: Routes = [
  { path: 'flashcards', component: FlashcardMainComponent },
  { path: 'test', component: MainTesterComponent },
  // { path: 'flashcard-creator', component: CustomCreatorComponent },
  { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
