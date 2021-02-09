import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./public/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'social',
    loadChildren: () => import('./membership/social/social.module').then(m => m.SocialPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'social/islands',
    loadChildren: () => import('./membership/social/islands/islands.module').then(m => m.IslandsPageModule)
  },
  { path: 'social/clubs-groups',
    loadChildren: () => import('./membership/social/clubs-groups/clubs-groups.module').then(m => m.ClubsGroupsPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'member',
    loadChildren: () => import('./membership/member/member.module').then(m => m.MemberPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'member/documents',
    loadChildren: () => import('./membership/member/documents/documents.module').then(m => m.DocumentsPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'member/payment',
    loadChildren: () => import('./membership/member/payment/payment.module').then(m => m.PaymentPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'sfca-business',
    loadChildren: () => import('./membership/sfca-business/sfca-business.module').then(m => m.SfcaBusinessPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'filming',
    loadChildren: () => import('./membership/filming/filming.module').then(m => m.FilmingPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'filming/documents',
    loadChildren: () => import('./membership/filming/documents/documents.module').then(m => m.DocumentsPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'security',
    loadChildren: () => import('./membership/security/security.module').then(m => m.SecurityPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'tree-watch',
    loadChildren: () => import('./membership/tree-watch/tree-watch.module').then(m => m.TreeWatchPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'directory',
    loadChildren: () => import('./membership/directory/directory.module').then(m => m.DirectoryPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AdminGuard]
  },
  { path: 'admin/add-member',
    loadChildren: () => import('./admin/add-member/add-member.module').then(m => m.AddMemberPageModule),
    canActivate: [AdminGuard]
  },
  { path: 'admin/add-non-member',
    loadChildren: () => import('./admin/add-non-member/add-non-member.module').then(m => m.AddNonMemberPageModule),
    canActivate: [AdminGuard]
  },
  { path: 'admin/events',
    loadChildren: () => import('./admin/events/events.module').then(m => m.EventsPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/notifications',
    loadChildren: () => import('./admin/notifications/notifications.module').then(m => m.NotificationsPageModule),
    canActivate: [AdminGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
