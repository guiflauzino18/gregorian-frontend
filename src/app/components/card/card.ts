import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type cardProps = {
  titulo: string,
  desc: string,
  icone: string,
  link: string
}

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  props = input<cardProps>()

}
