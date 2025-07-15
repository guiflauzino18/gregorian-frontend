import { Component, input, output } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { showConfirm } from '../../../utils/popup';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule,],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  open = input<boolean>(false);
  protected toggle = output<void>();
  protected logout = output<boolean>();

  protected toggleClick(){
    this.toggle.emit();
  }

  protected onClickLogout(){
    this.logout.emit(true)
  }

}
