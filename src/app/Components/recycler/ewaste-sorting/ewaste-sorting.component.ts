import { async } from '@angular/core/testing'
import { Component, OnInit } from '@angular/core'
import { ProductModel } from 'src/app/Models/product.model'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'
declare let web3: any

@Component( {
  selector: 'app-ewaste-sorting',
  templateUrl: './ewaste-sorting.component.html',
  styleUrls: [ './ewaste-sorting.component.css' ]
} )
export class EwasteSortingComponent implements OnInit {
  ew: any
  account: any
  product: ProductModel[] = []
  constructor ( private route: Router, private web3service: Web3Service ) {
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
        if ( p.recyclerID === '0' && p.status ) {
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
  recycle = async ( productId ) => {
    try {
      const sort = await this.ew.SortRecycler( productId ).send( {
        from: this.account,
        gas: 5000000
      } )
      console.log( 'Log: EwasteSortingComponent -> recycle -> sort', sort )
      if ( sort.status ) {
        // delete this.product
        alert( 'Product Added to Recycle SuccessFully' )
        await this.onLoad()
      }
    } catch ( error ) {
      console.log( 'Log: EwasteSortingComponent -> recycle -> error', error )
    }
  }
}
