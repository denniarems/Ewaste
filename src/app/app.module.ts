import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { ViewProductComponent } from './Components/manufacture/view-product/view-product.component'
import { EwasteListComponent } from './Components/manufacture/ewaste-list/ewaste-list.component'
import { EwasteSortingComponent } from './Components/recycler/ewaste-sorting/ewaste-sorting.component'
import { ViewSortedComponent } from './Components/recycler/view-sorted/view-sorted.component'
import { HomeComponent } from './Components/home/home.component'
import { RegisterComponent } from './Components/home/register/register.component'
import { RecyclerComponent } from './Components/recycler/recycler.component'
import { ManufactureComponent } from './Components/manufacture/manufacture.component'
import { AddProductComponent } from './Components/manufacture/add-product/add-product.component'
import { ManufactureRouteComponent } from './Components/manufacture/manufacture-route/manufacture-route.component'
import { RecyclerRouteComponent } from './Components/recycler/recycler-route/recycler-route.component'
import { NavigationComponent } from './Components/navigation/navigation.component'

@NgModule( {
  declarations: [
    AppComponent,
    RegisterComponent,
    RecyclerComponent,
    HomeComponent,
    ManufactureComponent,
    AddProductComponent,
    ViewProductComponent,
    EwasteListComponent,
    EwasteSortingComponent,
    ViewSortedComponent,
    ManufactureRouteComponent,
    RecyclerRouteComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
