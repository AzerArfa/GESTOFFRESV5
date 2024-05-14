import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../services/offer.service'; // Adjust the path as needed
import { Offer } from '../model/offer.model'; // Adjust the path as needed

@Component({
  selector: 'app-offresadmin',
  templateUrl: './offresadmin.component.html',
  styleUrls: ['./offresadmin.component.css']
})
export class OffresadminComponent implements OnInit {
  offers: Offer[] = [];
  isLoading = true; // Track loading state

  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const entrepriseId = params['id']; // Make sure 'id' is the correct param key as set in your routing
      if (entrepriseId) {
        this.getOffersByEntreprise(entrepriseId);
      }
    });
  }

  private getOffersByEntreprise(entrepriseId: string): void {
    this.offerService.getOffersByEntrepriseId(entrepriseId).subscribe({
      next: (offers) => {
        this.offers = offers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load offers:', error);
        this.isLoading = false;
        // Handle errors appropriately in your UI
      }
    });
  }
}
