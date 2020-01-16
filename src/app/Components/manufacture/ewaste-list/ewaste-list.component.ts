import { Component, OnInit } from '@angular/core'
import { ProductModel } from 'src/app/Models/product.model'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
declare let web3: any
@Component( {
  selector: 'app-ewaste-list',
  templateUrl: './ewaste-list.component.html',
  styleUrls: [ './ewaste-list.component.css' ]
} )
export class EwasteListComponent implements OnInit {
  ew: any
  account: any
  userId: any
  product: ProductModel[] = []
  totalProducts: number
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
      this.totalProducts = await this.ew.P_ID().call( { from: this.account } ) - 1
      for ( let index = 1;index <= this.totalProducts;index++ ) {
        const p = await this.ew.Product( index ).call( { from: this.account } )
        if ( p.manufactureId === this.userId && !p.status ) {
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
      console.log( 'Log: EwasteSortingComponent -> onLoad -> error', error )
    }
  }
  buy = async ( index, productId ) => {
    try {
      const value = this.product[ index ].price
      const sort = await this.ew.BuyProduct( productId ).send( {
        from: this.account,
        gas: 5000000,
        value: web3.utils.toWei( String( value ), 'ether' )
      } )
      console.log( 'Log: EwasteSortingComponent -> recycle -> sort', sort )
      if ( sort.status ) {
        // delete this.product
        delete this.product[ index ]
        alert( 'Product Added to Recycle SuccessFully' )
      }
    } catch ( error ) {
      console.log( 'Log: EwasteSortingComponent -> recycle -> error', error )
    }
  }

}

