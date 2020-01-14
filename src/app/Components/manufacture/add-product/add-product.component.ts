import { ProductModel } from './../../../Models/product.model'
import { NgForm } from '@angular/forms'
import { async } from '@angular/core/testing'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'

@Component( {
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [ './add-product.component.css' ]
} )
export class AddProductComponent implements OnInit {
  ew: any
  account: any

  constructor ( private route: Router, private web3service: Web3Service ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.ew = data.ewaste
    } )
  }
  addProduct = async ( form: NgForm ) => {
    const Product: ProductModel = form.value
    const addProduct = await this.ew
      .CreateProduct(
        Product.productName,
        Product.category,
        Product.description,
        Product.price,
      )
      .send( {
        from: this.account,
        gas: 5000000
      } )
    console.log( 'Log: AddProductComponent -> addProduct -> addProduct', addProduct )
  }
}
