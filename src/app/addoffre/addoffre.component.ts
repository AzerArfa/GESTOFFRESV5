import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { formatDate } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addoffre',
  templateUrl: './addoffre.component.html',
  styleUrls: ['./addoffre.component.css']
})
export class AddoffreComponent implements OnInit {
  newOffer: any = {
    titre: '',
    description: '',
    localisation: '',
    datelimitesoumission: ''
  };
  selectedFile: File | null = null;
  selectedDocument: File | null = null;
  entrepriseId!: string;
  datelimitesoumissionFormatted: string | null = null;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.entrepriseId = params['id'];
    });
  }

  onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  onDocumentSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedDocument = event.target.files[0];
    }
  }

  createOffer(): void {
    const formData = new FormData();
    formData.append('titre', this.newOffer.titre);
    formData.append('description', this.newOffer.description);
    formData.append('localisation', this.newOffer.localisation);
    formData.append('entrepriseId', this.entrepriseId);
    if (this.datelimitesoumissionFormatted) {
      formData.append('datelimitesoumission', this.datelimitesoumissionFormatted);
    }
    if (this.selectedFile) {
      formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedDocument) {
      formData.append('document', this.selectedDocument, this.selectedDocument.name);
    }

    this.offerService.createOffer(formData).subscribe({
      next: (response) => {
        console.log('Offer created successfully', response);
        this.location.back();
      },
      error: (error) => {
        console.error('Error creating offer', error);
        alert('Failed to create the offer. Check console for details.');
      }
    });
  }
}
