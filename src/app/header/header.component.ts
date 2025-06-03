import { ChangeDetectionStrategy, Component, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { INITIAL_SCROLL_POSITION, SCROLL_THRESHOLD, SCROLL_TRIGGER_HEIGHT } from "../shared/constants";

@Component({
  selector: "app-header",
  imports: [CommonModule],
  template: `
    <div class="header" [class.hidden]="headerHidden">
      <div class="print">
        <a [href]="pdfSrc" target="_blank" title="Print" class="link">
          <img src="/icons/printer.png" alt="Print" class="icon" />
        </a>
      </div>
      <div class="social-links">
        <a [href]="githubUrl" target="_blank" rel="noopener noreferrer" class="link" aria-label="GitHub profile">
          <img src="/icons/github-mark.png" alt="GitHub" class="icon" />
        </a>
        <a [href]="inUrl" target="_blank" rel="noopener noreferrer" class="link" aria-label="LinkedIn profile">
          <img src="/icons/InBug-Black.png" alt="LinkedIn" class="icon" />
        </a>
      </div>
      <div class="contact-links">
        <a [href]="'mailto:' + email" target="_blank" title="Send Email" class="link">
          <img src="/icons/mail.png" alt="Mail" class="icon" />
        </a>
        <a [href]="'tel:' + phoneNumber" title="Call Phone" class="link">
          <img src="/icons/phone.png" alt="Phone" class="icon" />
        </a>
      </div>
    </div>
  `,
  styles: `
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background-color: rgb(217 217 217 / 60%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: fixed;
      z-index: 1;
      width: 100%;
      top: 0;
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
    }

    .header.hidden {
      transform: translateY(-100%);
    }

    .print,
    .social-links,
    .contact-links {
      display: flex;
      align-items: center;
    }

    .print {
      flex: 1;
      justify-content: flex-start;
    }

    .contact-links {
      flex: 1;
      justify-content: flex-end;
      gap: 1rem;
      padding-right: 1rem;
    }

    .social-links {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      max-width: 800px;
    }

    .link {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .link:hover .icon,
    .link:focus .icon {
      transform: scale(1.3);
    }

    .icon {
      width: 3rem;
      height: 3rem;
      object-fit: contain;
      transition: transform 0.2s ease;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly pdfSrc = "cv.pdf";
  protected readonly phoneNumber = "+36202861399";
  protected readonly email = "Peter Bence Czaun <bence6811@gmail.com>";
  protected readonly githubUrl = "https://github.com/cZalyun";
  protected readonly inUrl = "https://www.linkedin.com/in/p%C3%A9ter-bence-czaun-97b934199/";

  protected headerHidden = false;

  private lastScrollTop = INITIAL_SCROLL_POSITION;
  private readonly scrollThreshold = SCROLL_THRESHOLD;

  @HostListener("body:scroll", [])
  public onWindowScroll(): void {
    const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(currentScrollTop);

    // Determine scroll direction
    if (Math.abs(currentScrollTop - this.lastScrollTop) > this.scrollThreshold) {
      // Hide header when scrolling down, show when scrolling up
      this.headerHidden = currentScrollTop > this.lastScrollTop && currentScrollTop > SCROLL_TRIGGER_HEIGHT;
      this.lastScrollTop = currentScrollTop;
    }
  }
}
