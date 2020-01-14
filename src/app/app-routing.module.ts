import { RecyclerGuard } from './Guards/Recycler/recycler.guard'

import { LoginGuard } from './Guards/Login/login.guard'
import { ViewSortedComponent } from './Components/recycler/view-sorted/view-sorted.component'
import { EwasteSortingComponent } from './Components/recycler/ewaste-sorting/ewaste-sorting.component'
import { RecyclerRouteComponent } from './Components/recycler/recycler-route/recycler-route.component'
import { RecyclerComponent } from './Components/recycler/recycler.component'
import { EwasteListComponent } from './Components/manufacture/ewaste-list/ewaste-list.component'
import { ViewProductComponent } from './Components/manufacture/view-product/view-product.component'
import { ManufactureRouteComponent } from './Components/manufacture/manufacture-route/manufacture-route.component'
import { AddProductComponent } from './Components/manufacture/add-product/add-product.component'
import { ManufactureComponent } from './Components/manufacture/manufacture.component'
import { RegisterComponent } from './Components/home/register/register.component'
import { HomeComponent } from './Components/home/home.component'


import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ManufactureGuard } from './Guards/Manufacture/manufacture.guard'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [ LoginGuard ] },
  {
    path: 'manufacture', component: ManufactureRouteComponent,
    canActivate: [ ManufactureGuard ],
    children: [
      { path: '', component: ManufactureComponent },
      { path: 'addProduct', component: AddProductComponent },
      { path: 'viewProduct', component: ViewProductComponent },
      { path: 'ewasteList', component: EwasteListComponent }
    ]
  },
  {
    path: 'recycler', component: RecyclerRouteComponent,
    canActivate: [ RecyclerGuard ],
    children: [
      { path: '', component: RecyclerComponent },
      { path: 'addProductRecycle', component: EwasteSortingComponent },
      { path: 'viewSorted', component: ViewSortedComponent }
    ]
  }
]

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
