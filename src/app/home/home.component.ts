// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../services/offer.service';
import { Offer } from '../model/offer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  offers: Offer[] = [];
  isLoading = true; // Track loading state

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.loadAllOffers();
  }

  private loadAllOffers(): void {
    this.offerService.getAllOffersuser().subscribe({
      next: (offers) => {
        this.offers = offers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load all offers:', error);
        this.isLoading = false;
      }
    });
  }
}
