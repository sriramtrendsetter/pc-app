import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgxMdModule } from 'ngx-md';
import { StorageServiceModule } from 'angular-webstorage-service';



import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { TutorialComponent } from './ui/tutorial/tutorial.component';
import { VideoComponent } from './ui/video/video.component';
import { EditorComponent } from './ui/editor/editor.component';
import { QuizComponent } from './ui/quiz/quiz.component';
import { CourseService } from './services/course/course.service';
import { SigninComponent } from './ui/signin/signin.component';
import { QuestionsComponent } from './ui/interview/questions.component';
import { UserDesktopComponent } from './ui/user/desktop/userdesktop.component';

import { CodeExecutorService } from './services/code-executor/code-executor.service';
import { TutorialResolve } from './tutorial.resolve';
import { QuizService } from './services/quiz/quiz.service';
import { UserService } from './services/user/user.service';

import { SafePipe } from './pipes/safepipe';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login-v2";

const routes: Routes = [
  {
    path:'', redirectTo: '/course/1/topic/1', pathMatch: 'full'},
  { path: 'course/:courseId', component: TutorialComponent ,
    children: [
      { path: '', redirectTo: './topic/1', pathMatch: 'full'},
      { path: 'topic/:topicId', component:  VideoComponent },
      {path: 'interview/:courseName', component: QuestionsComponent}
    ],
    resolve: { courses: TutorialResolve }
  },
  {
    path:'userdesktop', component: UserDesktopComponent},
    {
      path: '**' , redirectTo: '/course/1/topic/1', pathMatch: 'full'
    }
];

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("26197787311-0pmktkpj9m5bts42j5g9u5f5gem4sfrd.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,LayoutComponent, HeaderComponent, FooterComponent, TutorialComponent, VideoComponent, EditorComponent,
    SafePipe, QuizComponent, SigninComponent, QuestionsComponent, UserDesktopComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AceEditorModule, SocialLoginModule,
    RouterModule.forRoot(routes), NgxMdModule.forRoot(),StorageServiceModule
  ],
  providers: [TutorialResolve, CourseService, CodeExecutorService, QuizService, UserService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
