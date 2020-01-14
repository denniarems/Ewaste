import { async } from '@angular/core/testing'
import { UserModel } from './../../../Models/user.model'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Router } from '@angular/router'
import { Web3Model } from 'src/app/Models/web3.model'

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent implements OnInit {
  ew: any
  account: any

  constructor ( private route: Router, private web3service: Web3Service ) { }
  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.ew = data.ewaste
    } )
  }
  register = async ( form: NgForm ) => {
    const User: UserModel = form.value
    const UserRegister = await this.ew
      .Registration(
        User.userName,
        User.contactAddress,
        User.accountType
      )
      .send( {
        from: this.account,
        gas: 5000000
      } )
    console.log( 'Log: RegisterComponent -> register -> UserRegister', UserRegister )
    if ( UserRegister.status ) {
      alert( 'Registration Success' )
      this.route.navigateByUrl( '/' )
    }
  }
}
