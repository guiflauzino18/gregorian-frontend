import { Component, input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';


export type tabProps = {
  content: any,
  title: string,
  icon?: string
}

@Component({
  selector: 'app-tabs',
  imports: [MatTabsModule, MatIconModule, CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css'
})
export class Tabs {
  props = input<tabProps[]>();

}
