import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'public',
    component: PublicPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: './tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'member-access',
        children: [
          {
            path: '',
            loadChildren: './tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: './contact/contact.module#ContactPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/public/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/public/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
