import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import type { Type } from "@angular/core";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import type { CvComponent } from "./app/cv/cv.component";
import { provideAnimations } from "@angular/platform-browser/animations";

export enum PathList {
  cV = "cv",
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideRouter([
      { path: "", pathMatch: "full", redirectTo: PathList.cV },
      {
        path: PathList.cV,
        loadComponent: async (): Promise<Type<CvComponent>> => (await import("./app/cv/cv.component")).CvComponent,
      },
      { path: "**", redirectTo: PathList.cV },
    ]),
  ],
}).catch((err: unknown) => {
  console.error(err);
});
