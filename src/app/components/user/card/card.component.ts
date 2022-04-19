import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: Card[] = [];
  newCard: Card = { spanish: '', translation: '', group: 1, set: '', language: ''};
  showModal: boolean = false;

  constructor(private cardService: CardsService) { }

  ngOnInit(): void {
    this.cardService.getAllCards().then(cards => {
      this.cards = cards;
    })
  }

  saveCard() {
    this.cardService.post(this.newCard).then(card => {
      if (card !== undefined) {
        this.cards.push(this.newCard);
        this.newCard = { spanish: '', translation: '', group: 1, set: '', language: ''};
      }
    })
  }

  deleteCard(id: number): void {
    this.cardService.deleteCard(id).then(() => {
      const cardFilter = this.cards.filter(card => card.id !== id);
      this.cards = cardFilter;
      this.showModal = false;
    })
  }

}