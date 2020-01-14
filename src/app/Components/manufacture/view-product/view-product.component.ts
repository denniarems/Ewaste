import { async } from '@angular/core/testing'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'

@Component( {
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: [ './view-product.component.css' ]
} )
export class ViewProductComponent implements OnInit {
  ew: any
  account: any

  constructor ( private route: Router, private web3service: Web3Service ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.ew = data.ewaste
    } )
    this.onLoad()
  }
  onLoad = async () => {
    const totalProducts = await this.ew.P_ID().call( { from: this.account } ) - 1
    console.log( 'Log: ViewProductComponent -> onLoad -> totalProducts', totalProducts )
  }

}
