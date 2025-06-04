import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import type { Type } from "@angular/core";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import type { CvComponent } from "./app/cv/cv.component";
import { provideAnimations } from "@angular/platform-browser/animations";


bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideRouter([
      {
        path: "**",
        loadComponent: async (): Promise<Type<CvComponent>> => (await import("./app/cv/cv.component")).CvComponent,
      },
    ]),
  ],
}).catch((err: unknown) => {
  console.error(err);
});
