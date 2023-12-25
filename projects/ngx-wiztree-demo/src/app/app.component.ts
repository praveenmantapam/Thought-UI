import { Component } from '@angular/core';
import { NgxWiztreeStep } from 'projects/ngx-wiztree/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-wiztree-demo';

  public steps: Array<NgxWiztreeStep> = [];

  /**
   *
   */
  constructor() {
    this.steps = [
      {
        title: "1",
        branches: [
          {
            title: "2",
            dashedLine: false,
            branches: [
              {
                title: "3"
              },
              {
                title: "4"
              }
            ]
          },
          {
            title: "5",
            branches: [
              {
                title: "6"
              },
              {
                title: "7",
                branches: [
                  {
                    title: "8"
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

  }
}
