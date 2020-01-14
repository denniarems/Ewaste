import { Component, OnInit } from '@angular/core'
import { ProductModel } from 'src/app/Models/product.model'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
declare let web3: any
@Component( {
  selector: 'app-view-sorted',
  templateUrl: './view-sorted.component.html',
  styleUrls: [ './view-sorted.component.css' ]
} )
export class ViewSortedComponent implements OnInit {

  ew: any
  account: any
  userId: any
  product: ProductModel[] = []
  constructor ( private route: Router, private web3service: Web3Service ) {
    this.userId = localStorage.getItem( 'userId' )
  }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.ew = data.ewaste
    } )
    this.onLoad()
  }
  onLoad = async () => {
    try {
      const totalProducts = await this.ew.P_ID().call( { from: this.account } ) - 1
      for ( let index = 1;index <= totalProducts;index++ ) {
        const p = await this.ew.Product( index ).call( { from: this.account } )
        if ( p.recyclerID === this.userId && !p.status ) {
          this.product.push( {
            productId: index,
            productName: p.productName,
            description: p.description,
            price: web3.utils.fromWei( p.price, 'ether' ),
            category: p.category,
            manufactureId: p.manufactureId,
            recyclerID: p.recyclerID,
            status: p.status
          } )
        }
      }
    } catch ( error ) {
      console.log( 'Log: ViewProductComponent -> onLoad -> error', error )
    }
  }
}
