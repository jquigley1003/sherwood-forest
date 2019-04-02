import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '',
    loadChildren: './public/tabs.module#TabsPageModule'
  },
  { path: 'social',
    loadChildren: './membership/social/social.module#SocialPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'member',
    loadChildren: './membership/member/member.module#MemberPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'sfca-business',
    loadChildren: './membership/sfca-business/sfca-business.module#SfcaBusinessPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'filming',
    loadChildren: './membership/filming/filming.module#FilmingPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'security',
    loadChildren: './membership/security/security.module#SecurityPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'directory',
    loadChildren: './membership/directory/directory.module#DirectoryPageModule',
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
