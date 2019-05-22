import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '',
    loadChildren: './public/tabs.module#TabsPageModule'
  },
  { path: 'social',
    loadChildren: './membership/social/social.module#SocialPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'social/islands',
    loadChildren: './membership/social/islands/islands.module#IslandsPageModule'
  },
  { path: 'member',
    loadChildren: './membership/member/member.module#MemberPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'member/documents',
    loadChildren: './membership/member/documents/documents.module#DocumentsPageModule',
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
  { path: 'tree-watch',
    loadChildren: './membership/tree-watch/tree-watch.module#TreeWatchPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'directory',
    loadChildren: './membership/directory/directory.module#DirectoryPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'admin',
    loadChildren: './admin/admin.module#AdminPageModule',
    canActivate: [AdminGuard]
  },
  { path: 'admin/add-member',
    loadChildren: './admin/add-member/add-member.module#AddMemberPageModule',
    canActivate: [AdminGuard]
  },
  { path: 'admin/add-non-member',
    loadChildren: './admin/add-non-member/add-non-member.module#AddNonMemberPageModule',
    canActivate: [AdminGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
