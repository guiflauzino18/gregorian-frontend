import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

type pages = {
  nome: string,
  link: string,
  icon: string
}

export type pageHeaderProps = {
  title: string,
  page: pages[],
}

@Component({
  selector: 'app-page-header',
  imports: [RouterLink],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css'
})
export class PageHeader {

  props = input<pageHeaderProps>();

}
