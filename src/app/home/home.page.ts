import { Component, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';

/**
 * Demo für Zeichnen auf HTML5-Canvas-Element.
 * <br><br>
 * Vorgehen nach https://devdactic.com/canvas-painting-ionic-4
 * <br><br>
 * Erklärung Koordinatensystem: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  /** Member-Variable für Zugriff auf HTML-Element mit Anker `#leinwand`. */
  @ViewChild("leinwand", { static: false }) canvas: any;

  private canvasElement: any;

  /** Aktuelle Canvas-Breite in Pixel (px). */
  private canvasBreite = 0;

    /** Aktuelle Canvas-Höhe in Pixel (px). */
  private canvasHoehe  = 0;

  /** Über RadioButtons in Akkordeon-Element gewählte Motiv, das im Canvas dargestellt wird.  */
  public motiv = "diagonalen";

  /**
   * Constructor for Dependency Injection.
   */
  constructor(private platform: Platform) {}

  /**
   * Lifecycle-Methode. Einzige Methode aus Interface AfterViewInit.
   */
  public ngAfterViewInit() {

    this.initCanvas();
  }

  /**
   * Methode wird augerufen wenn sich Viewport-Größe ändert.
   * <br><br>
   *
   * Werkzeug zur Messung aktuelle Viewport-Größe im Browser: https://whatismyviewport.com/
   */
  @HostListener("window:resize") onViewportSizeChanged() {

    console.log("Viewport-Dim geändert!");
    this.initCanvas();
  }

  /**
   * Event-Handler-Methode für RadioGroup, mit der Motiv ausgewählt
   * wird, das zu zeichnen ist.
   */
  public onMotivAuswahlGeaendert() {

    console.log("Neues Motiv ausgewählt.");

    this.canvasLoeschen();
    this.motivZeichnen();
  }

  /**
   * Zeichenfläche initialisieren: Member-Variable `canvasElement`
   * füllen und von Zeichenfläche anhand aktueller Viewport-Größe
   * festlegen. Danach wird das aktuell gewählte Motiv gezeichnet.
   * <br><br>
   * Die Methode muss ganz zu Beginn und nach Änderungen der
   * Viewport-Größe aufgerufen werden.
   */
  private initCanvas() {

    const viewportBreite = this.platform.width();
    const viewportHoehe  = this.platform.height();
    console.log(`Viewport: breite=${viewportBreite}px, hoehe=${viewportHoehe}px`);

    this.canvasElement = this.canvas.nativeElement;

    this.canvasElement.width  = viewportBreite*0.90 + ""; // weil in CSS-Datei margin-left=margin-right=5%; 100%-2*5%=90%
    this.canvasElement.height = viewportHoehe *0.60 + "";

    this.canvasBreite = this.canvasElement.width;
    this.canvasHoehe  = this.canvasElement.height;

    console.log(`Canvas: breite=${this.canvasElement.width}px, hoehe=${this.canvasElement.height}px`);

    this.motivZeichnen();
  }

  /**
   * Getter für Zeichenkontext.
   *
   * @returns Zeichenkontext (wurde zurückgesetzt).
   */
  private getZeichenKontext() { 

    const kontext = this.canvasElement.getContext("2d");
    kontext.reset();

    kontext.lineJoin    = "round";
    kontext.lineWidth   = 2;

    return kontext;
  }

  /**
   * Löscht die Zeichenfläche, v.a. vor Zeichnen eines neuen Motivs.
   */
  private canvasLoeschen() {

    const kontext = this.getZeichenKontext();
    kontext.clearRect(0, 0, this.canvasBreite , this.canvasHoehe);

    console.log("Zeichenfläche wurde gelöscht.");
  }

  /**
   * Wertet aktuell in RadioGroup gewähltes Motiv aus und
   * ruft entsprechende Methode auf, um es zu zeichnen.
   */
  private motivZeichnen() {

    switch (this.motiv) {

      case "diagonalen":
        this.zeichneDiagonalen();
        break;

      case "dreieck":
        this.zeichneDreieck();
        break;

      case "rechteck":
        this.zeichneRechteck();
        break;

      case "kreis":
        this.zeichneKreis();
        break;

      case "ellipse":
        this.zeichneEllilpse();
        break;

      default: console.log(`Unerwartetes Motiv "${this.motiv}" ausgewählt.`);
    }
  }

  /**
   * Methode um Diagonalen in Canvas zu zeichnen.
   */
  private zeichneDiagonalen() {

    const kontext = this.getZeichenKontext();

    // Line 1: links oben nach rechts unten
    kontext.strokeStyle = "#ff0000"; // rot

    kontext.beginPath;
    kontext.moveTo( 0, 0 );
    kontext.lineTo( this.canvasBreite, this.canvasHoehe ); // x,y
    kontext.closePath();
    kontext.stroke();

    // Linie 2: links unten nach recht oben
    kontext.strokeStyle = "#0000ff"; // blau

    kontext.beginPath();
    kontext.moveTo(                 0, this.canvasHoehe );
    kontext.lineTo( this.canvasBreite, 0                );
    kontext.closePath();
    kontext.stroke();

    console.log("Diagonalen gezeichnet.");
  }

  /**
   * Zeichnet ein gefülltes Dreick.
   */
  private zeichneDreieck() {

    const kontext = this.getZeichenKontext();

    const abstandRand = 5;

    // Punkt A: oben mitte
    const ax = this.canvasBreite / 2;
    const ay = abstandRand;

    // Punkt B: links unten
    const bx = abstandRand;
    const by = this.canvasHoehe - abstandRand;

    // Punkt C: rechts unten
    const cx = this.canvasBreite - abstandRand;
    const cy = by;

    kontext.fillStyle   = "#ff00ff"; // violett
    kontext.strokeStyle = "#000000"; // schwarz

    kontext.beginPath();
    kontext.moveTo(ax, ay);
    kontext.lineTo(bx, by);
    kontext.lineTo(cx, cy);
    kontext.closePath();

    kontext.fill();

    console.log("Dreieck gezeichnet.");
  }

  /**
   * Zeichnet ein Rechteck.
   */
  private zeichneRechteck() {

      const kontext = this.getZeichenKontext();

      const abstandRand = 10;

      kontext.strokeStyle = "#ff0000"; // schwarz

      kontext.beginPath();

      kontext.rect(abstandRand,  // x
                   abstandRand,  // y
                   this.canvasBreite - 2*abstandRand,  // Breite
                   this.canvasHoehe  - 2*abstandRand); // Höhe

      kontext.stroke();

      console.log("Rechteck gezeichnet.");
  }

  /**
   * Methode um Kreis in Canvas zu zeichnen.
   */
   private zeichneKreis() {

    const kontext = this.getZeichenKontext();

    const mittelpunktX = this.canvasBreite / 2;
    const mittelpunktY = this.canvasHoehe  / 2;

    const radius = Math.min(this.canvasBreite, this.canvasHoehe) * 0.4;

    kontext.strokeStyle = "#00ff00"; // grün

    kontext.beginPath();
    kontext.arc( mittelpunktX, mittelpunktY,
                        radius,
                        0, // Startwinkel
                        2 * Math.PI // Endwinkel
                      );
    kontext.stroke();

    console.log("Kreis gezeichnet.");
  }

  /**
   * Methode um Ellipse in Canvas zu zeichnen.
   */
  private zeichneEllilpse() {

    const kontext = this.getZeichenKontext();

    const mittelpunktX = this.canvasBreite / 2;
    const mittelpunktY = this.canvasHoehe  / 2;

    const radiusHorizontal = this.canvasBreite * 0.5 * 0.9;
    const radiusVertikal   = this.canvasHoehe  * 0.5 * 0.9;

    kontext.strokeStyle = "#0000ff"; // blau

    kontext.beginPath();
    kontext.ellipse( mittelpunktX, mittelpunktY,
                     radiusHorizontal, radiusVertikal,
                     0, // Rotation
                     0, // Startwinkel
                     2 * Math.PI // Endwinkel
                   );
    kontext.stroke();

    console.log("Ellipse gezeichnet.");
  }

}
