import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../model/offer.model';
import { OfferService } from '../services/offer.service';
import { Entreprise } from '../model/entreprise.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-detailsoffre',
  templateUrl: './detailsoffre.component.html',
  styleUrls: ['./detailsoffre.component.css']
})
export class DetailsoffreComponent implements OnInit {
  currentOffer: Offer = new Offer();
  currentEntreprise: Entreprise = new Entreprise();

  constructor(private activatedRoute: ActivatedRoute, 
              private offerService: OfferService,
              private userService: UserService) {}

  ngOnInit(): void {
    const offerId = this.activatedRoute.snapshot.params['id'];
    this.loadCurrentOffer(offerId);
  }

  loadCurrentOffer(offerId: string): void {
    this.offerService.getOfferByIdUser(offerId).subscribe(offer => {
      this.currentOffer = offer;
      if (offer.entrepriseId) {
        this.loadCurrentEntreprise(offer.entrepriseId);
      }
      console.log('Offer data:', offer);
    }, error => {
      console.error('Error loading offer data:', error);
    });
  }

  loadCurrentEntreprise(entrepriseId: string): void {
    this.userService.getEntrepriseById(entrepriseId).subscribe(entreprise => {
      this.currentEntreprise = entreprise;
    }, error => {
      console.error('Error loading entreprise data:', error);
    });
  }
}
