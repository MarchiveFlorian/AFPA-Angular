import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  public monTitre: string;
  public monIntroduction: string;
  public maPhraseAcccroche: string;

  champSaisi = new FormControl('');

  public capitale: string;
  public population: string;
  public monnaie: string;
  public langue: string;

  constructor(private http: HttpClient) {
    this.monTitre = "MyCapitale";
    this.monIntroduction = "Obtenez les informations sur un pays !";
    this.maPhraseAcccroche = "Insérez le pays dans le formulaire ci-dessous.";
  }

  public afficherChampSaisi() {
    return this.http.get("https://restcountries.com/v3.1/name/" + this.champSaisi.value)
      .subscribe((data:any) => {
        console.log(data[0]['currencies'][Object.keys(data[0]['currencies'])[0]]);
        this.capitale = data[0]['capital'],
        this.population = data[0]['population'] + " habitants",
        this.monnaie = data[0]['currencies'][Object.keys(data[0]['currencies'])[0]]['name'],
        this.langue = data[0]['languages'][Object.keys(data[0]['languages'])[0]]
      });
  }
}