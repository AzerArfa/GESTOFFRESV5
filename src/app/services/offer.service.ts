import { Injectable } from '@angular/core';
import { offerApiURL } from '../config';
import { Offer } from '../model/offer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';// Make sure you have this package or a similar one for UUID handling

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log("Token used: ", token); // Assuming token is stored in local storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${offerApiURL}`, { headers: this.getAuthHeaders() });
  }

  getOfferById(offerId: string): Observable<Offer> {
    return this.http.get<Offer>(`${offerApiURL}/${offerId}`, { headers: this.getAuthHeaders() });
  }

  getOffersByEntrepriseId(entrepriseId: string): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${offerApiURL}/entreprises/${entrepriseId}/offers`, { headers: this.getAuthHeaders() });
  }

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${offerApiURL}`, offer, { headers: this.getAuthHeaders() });
  }

  updateOffer(offerId: string, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${offerApiURL}/${offerId}`, offer, { headers: this.getAuthHeaders() });
  }

  deleteOffer(offerId: string): Observable<any> {
    return this.http.delete<any>(`${offerApiURL}/${offerId}`, { headers: this.getAuthHeaders() });
  }

  // Include other specific methods you have in your controller here
}
