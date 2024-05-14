import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { Offer } from '../model/offer.model';

@Component({
  selector: 'app-offresadmin',
  templateUrl: './offresadmin.component.html',
  styleUrls: ['./offresadmin.component.css']
})
export class OffresadminComponent implements OnInit {
  offers: Offer[] = [];
  isLoading = true; // Track loading state
  entrepriseId: string | null = null;

  constructor(private offerService: OfferService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entrepriseId = params['id']; // Directly set entrepriseId from route parameters
      if (this.entrepriseId) {
        this.getOffersByEntreprise(this.entrepriseId);
      }
    });
  }

  supprimerOffre(id: string): void {
    let conf = confirm("Etes-vous sur ?");
    if (conf) {
      this.offerService.deleteOffer(id).subscribe(() => {
        console.log('Offre supprimé');
        window.location.reload(); // Reload the page after successful deletion
      }, (error) => {
        console.warn(error); // Log as warning instead of error
        window.location.reload(); // Reload the page even if an error occurs
      });
    }
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
      }
    });
  }
}
