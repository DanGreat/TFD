import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralPage } from './general.page';

const routes: Routes = [
  {
    path: 'general',
    component: GeneralPage,
    children: [
      {
        path: 'main',
        loadChildren: () => import('../main/main.module').then( m => m.MainPageModule)
      },
      {
        path: 'audio',
        loadChildren: () => import('../audio/audio.module').then( m => m.AudioPageModule)
      },
      {
        path: 'video',
        loadChildren: () => import('../video/video.module').then( m => m.VideoPageModule)
      },
      {
        path: 'confessions',
        loadChildren: () => import('../confessions/confessions.module').then( m => m.ConfessionsPageModule)
      },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      // },
    ]
  },
  {
    path: 'general',
    redirectTo: 'general/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
