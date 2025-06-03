import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, HostListener } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { CommonModule } from "@angular/common";
import {
  DEFAULT_ZOOM,
  INITIAL_SCROLL_POSITION,
  MINIMUM_ZOOM,
  REFERENCE_WIDTH,
  SCROLL_THRESHOLD,
  SCROLL_TRIGGER_HEIGHT,
} from "../shared/constants";

@Component({
  selector: "app-cv",
  imports: [PdfViewerModule, CommonModule],
  animations: [
    trigger("fadeIn", [
      state("void", style({ opacity: 0, transform: "translateY(100%)" })),
      state("*", style({ opacity: 1, transform: "translateY(0%)" })),
      transition("void => *", animate("500ms ease-in")), // Fade in while sliding in from below
    ]),
  ],
  template: `<pdf-viewer
    @fadeIn
    [src]="pdfSrc"
    [zoom]="zoom"
    [show-all]="true"
    [stick-to-page]="true"
    [render-text]="true"
    [render-text-mode]="2"
    [original-size]="false"
    [autoresize]="true"
    [class.header-hidden]="headerHidden"
    class="cv-pdf-container"
    #cv
  />`,
  styles: `
    .cv-pdf-container {
      justify-self: center;
      width: 96vw;
      height: 80vh;
      padding-top: 4rem;
      transition: padding-top 0.3s ease;
    }

    .cv-pdf-container.header-hidden {
      padding-top: 0.5rem;
    }

    ::ng-deep .ng2-pdf-viewer-container {
      overflow-x: visible !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent implements OnInit {
  // Protected properties (ordered first according to eslint member-ordering)
  protected readonly pdfSrc = "cv.pdf";

  // Default zoom level
  protected zoom = DEFAULT_ZOOM;

  // Track header visibility state
  protected headerHidden = false;

  // Instance fields
  private lastScrollTop = INITIAL_SCROLL_POSITION;
  private readonly scrollThreshold = SCROLL_THRESHOLD;

  /**
   * Recalculate zoom when window is resized
   */
  @HostListener("window:resize")
  public onResize(): void {
    this.calculateZoom();
  }

  /**
   * Track scroll to match header behavior
   */
  @HostListener("window:scroll", [])
  public onWindowScroll(): void {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    // Determine scroll direction - match the header component's logic
    if (Math.abs(currentScrollTop - this.lastScrollTop) > this.scrollThreshold) {
      // Update headerHidden state to match header component
      this.headerHidden = currentScrollTop > this.lastScrollTop && currentScrollTop > SCROLL_TRIGGER_HEIGHT;
      this.lastScrollTop = currentScrollTop;
    }
  }

  public ngOnInit(): void {
    this.calculateZoom();
  }

  /**
   * Calculate optimal zoom based on window width
   * Uses a responsive approach to maintain readability
   * - Smaller windows: maintain 1.0 scale
   * - Larger windows: zoom out proportionally
   */
  private calculateZoom(): void {
    const windowWidth = window.innerWidth;

    // Reference width where zoom should be 1.0
    const referenceWidth = REFERENCE_WIDTH;

    if (windowWidth <= referenceWidth) {
      // For smaller screens, maintain 1.0 scale
      this.zoom = DEFAULT_ZOOM;
    } else {
      // For larger screens, scale down proportionally
      // Formula: 1.0 * (referenceWidth / availableWidth)
      // This creates an inverse relationship - larger screen = smaller zoom
      const scaleFactor = referenceWidth / windowWidth;

      // Ensure zoom doesn't get too small (minimum zoom level)
      this.zoom = Math.max(MINIMUM_ZOOM, scaleFactor);
    }
  }
}
