import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

import { OfferService } from '../services/offer.service'; 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser = new User();

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
    private offerService: OfferService ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['id'];
    this.loadCurrentUser(userId);
  }

  loadCurrentUser(userId: string): void {
    this.userService.getUserById(userId)
      .subscribe(user => {
        this.currentUser = user;
        console.log('User data:', user);
      }, error => {
        console.error('Error loading user data:', error);
      });
  }

  formatDate(date: Date): string {
    if (!date) {
      return '';
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid date:', date);
      return '';
    }
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'long', day: 'numeric'
    };
    return new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
  }

  supprimerEntreprise(id: string): void {
    console.log('Checking offers for entreprise with ID:', id);
    this.offerService.getOffersByEntrepriseId(id).subscribe(offers => {
      if (offers && offers.length > 0) {
        alert("Vous devez supprimer les offres associés à cette entreprise avant de pouvoir la supprimer.");
      } else {
        this.deleteEntreprise(id);
      }
    }, error => {
      console.warn('Error checking offers for entreprise:', error);
    });
  }
  deleteEntreprise(id: string): void {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?");
    if (conf) {
      this.userService.supprimerEntreprise(id).subscribe(() => {
        console.log('Entreprise deleted successfully');
        window.location.reload(); // Reload the page after successful deletion
      }, (error) => {
        console.warn('Error deleting entreprise:', error);
        window.location.reload(); // Reload the page even if an error occurs
      });
    }
  }
}
