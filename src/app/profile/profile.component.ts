import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser = new User();

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {}

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

  supprimerEntreprise(id: string):void{
    console.log('Deleting user with ID:', id);
      let conf = confirm("Etes-vous sur ?");
      if (conf) {
        this.userService.supprimerEntreprise(id).subscribe(() => {
          console.log('User deleted successfully');
          window.location.reload(); // Reload the page after successful deletion
        }, (error) => {
          console.warn('Error deleting user:', error); // Log as warning instead of error
          window.location.reload(); // Reload the page even if an error occurs
        });
      }
  }
}
