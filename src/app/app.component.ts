import type { OnInit } from "@angular/core";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    console.clear();
    console.info(
      "\n",
      "▄▖▖▖      ▄▖  ▗       ▄           ▄▖        \n",
      "▌ ▌▌  ▄▖  ▙▌█▌▜▘█▌▛▘  ▙▘█▌▛▌▛▘█▌  ▌ ▀▌▀▌▌▌▛▌\n",
      "▙▖▚▘      ▌ ▙▖▐▖▙▖▌   ▙▘▙▖▌▌▙▖▙▖  ▙▖▙▖█▌▙▌▌▌\n",
      "\n",
    );
  }
}
