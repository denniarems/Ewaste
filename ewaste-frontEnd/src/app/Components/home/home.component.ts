import { async } from '@angular/core/testing'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Web3Model } from 'src/app/Models/web3.model'

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
} )
export class HomeComponent implements OnInit {
  ew: any
  account: any
  constructor ( private route: Router, private web3service: Web3Service ) { }

  ngOnInit() {
    this.web3service.Web3Details$.subscribe( ( data: Web3Model ) => {
      this.account = data.account
      this.ew = data.ewaste
    } )
  }
  login = async () => {
    try {
      await this.web3service.web3login()
      this.checkUser()
    } catch ( error ) {
      console.log( 'Log: HomeComponent -> login -> error', error )
    }
  }
  checkUser = async () => {
    try {
      const userid = await this.ew.UserID( this.account ).call( {
        from: this.account
      } )
      if ( userid > 0 ) {
        const user = await this.ew.User( userid ).call( {
          from: this.account
        } )
        localStorage.setItem( 'userId', userid )
        // localStorage.setItem( 'userData', user )
        if ( user.accountType === '1' ) {
          this.route.navigateByUrl( '/manufacture' )
        }
        if ( user.accountType === '2' ) {
          this.route.navigateByUrl( '/recycler' )
        }
      } else {
        alert( 'Invalid User' )
      }
    } catch ( error ) {
      console.log( 'Log: HomeComponent -> checkUser -> error', error )
    }
  }
  signUp() {
    this.route.navigateByUrl( '/register' )
  }
}
