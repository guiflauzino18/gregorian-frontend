import { Component, input } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export type TableProps = {
  data: any,
  dataSource: MatTableDataSource<any>,
  cells: string[],
  columns: string[],
}

@Component({
  selector: 'app-table',
  imports: [MatPaginator, MatTableModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {

  props = input<TableProps>();

}
