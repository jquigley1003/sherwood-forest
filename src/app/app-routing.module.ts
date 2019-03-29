import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './public/tabs.module#TabsPageModule' },
  { path: 'social', loadChildren: './membership/social/social.module#SocialPageModule' },
  { path: 'member', loadChildren: './membership/member/member.module#MemberPageModule' },
  { path: 'sfca-business', loadChildren: './membership/sfca-business/sfca-business.module#SfcaBusinessPageModule' },
  { path: 'filming', loadChildren: './membership/filming/filming.module#FilmingPageModule' },
  { path: 'security', loadChildren: './membership/security/security.module#SecurityPageModule' },
  { path: 'directory', loadChildren: './membership/directory/directory.module#DirectoryPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
