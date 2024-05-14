import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { Offer } from '../model/offer.model';
import { formatDate } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-updateoffer',
  templateUrl: './updateoffer.component.html',
  styleUrls: ['./updateoffer.component.css']
})
export class UpdateofferComponent implements OnInit {
  currentOffer: Offer = new Offer();
  selectedFile: File | null = null;
  selectedDocument: File | null = null;  // Handle the document upload
  datelimitesoumissionFormatted!: string;

  constructor(
    private offerService: OfferService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.offerService.getOfferById(id).subscribe(
        offer => {
          this.currentOffer = offer;
          if (offer.datelimitesoumission) {
            this.datelimitesoumissionFormatted = formatDate(offer.datelimitesoumission, 'yyyy-MM-dd', 'en-US');
          }
        },
        error => console.error('Error loading offer:', error)
      );
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  onDocumentSelected(event: any): void {
    if (event.target.files && event.target.files[0] && event.target.files[0].type === 'application/pdf') {
      this.selectedDocument = event.target.files[0];
    }
  }

  updateOffer(): void {
    const formData = new FormData();
    formData.append('titre', this.currentOffer.titre);
    formData.append('description', this.currentOffer.description);
    formData.append('localisation', this.currentOffer.localisation);
    formData.append('datelimitesoumission', this.datelimitesoumissionFormatted);

    if (this.selectedFile) {
      formData.append('img', this.selectedFile, this.selectedFile.name);
    }

    if (this.selectedDocument) {
      formData.append('document', this.selectedDocument, this.selectedDocument.name);
    }

    this.offerService.updateOfferFormData(this.currentOffer.id, formData).subscribe(
      () => {
        console.log('Offer updated successfully');
        this.location.back();
      },
      error => {
        console.error('Error updating offer:', error);
        alert('Failed to update the offer. Please check the console for more information.');
      }
    );
  }
}
