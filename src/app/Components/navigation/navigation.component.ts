import { Component, OnInit } from '@angular/core'
import { Web3Service } from 'src/app/Services/Web3/web3.service'
import { Router } from '@angular/router'

@Component( {
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.css' ]
} )
export class NavigationComponent implements OnInit {

  ContentType: number
  constructor ( private web3service: Web3Service, private route: Router ) { }
  ngOnInit() {
  }
  logOut = async () => {
    this.web3service.web3logout()
    localStorage.clear()
    this.route.navigateByUrl( '/' )
  }
}
