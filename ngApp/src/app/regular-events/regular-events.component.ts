import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-regular-events',
  templateUrl: './regular-events.component.html',
  styleUrls: ['./regular-events.component.css']
})
export class RegularEventsComponent implements OnInit {

  constructor(private _eventService: EventService) { }

   regularEvents =[]

  ngOnInit() {
     this._eventService.getRegularEvents()
      .subscribe(
        res => this.regularEvents=res,
        err => console.log(err)
      )
  }


}
