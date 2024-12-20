import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-iloveyou',
  templateUrl: './iloveyou.component.html',
  styleUrls: ['./iloveyou.component.scss'],
  imports: [
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    
  ]
})
export class IloveyouComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
