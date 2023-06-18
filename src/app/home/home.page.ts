import { Component, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';

/**
 * Demo für Zeichnen auf HTML5-Canvas-Element.
 * <br><br>
 * Vorgehen nach https://devdactic.com/canvas-painting-ionic-4
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild("leinwand", { static: false }) canvas: any;

  private canvasElement: any;

  private canvasBreite = 0;
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
   * Löscht die Zeichenfläche, v.a. vor Zeichnen eines neuen Motivs.
   */
  private canvasLoeschen() {

    const zeichenContext = this.canvasElement.getContext("2d");
    zeichenContext.clearRect(0, 0, this.canvasBreite, this.canvasHoehe);

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

      case "kreis":
        this.zeichneKreis();
        break;

      default: console.log(`Unerwartetes Motiv "${this.motiv}" ausgewählt.`);
    }
  }

  /**
   * Methode um Kreis in Canvas zu zeichnen.
   */
  private zeichneKreis() {

    const mittelpunktX = this.canvasBreite / 2;
    const mittelpunktY = this.canvasHoehe  / 2;

    const radius = Math.min(this.canvasBreite, this.canvasHoehe) * 0.4;

    const zeichenContext = this.canvasElement.getContext("2d");

    zeichenContext.lineJoin    = "round";
    zeichenContext.strokeStyle = "#00ff00"; // grün
    zeichenContext.lineWidth   = 2;

    zeichenContext.beginPath();
    zeichenContext.arc( mittelpunktX, mittelpunktY,
                        radius,
                        0, // Startwinkel
                        2 * Math.PI // Endwinkel
                      );
    zeichenContext.closePath();
    zeichenContext.stroke();

    console.log("Kreis gezeichnet.");
  }

  /**
   * Methode um Diagonalen in Canvas zu zeichnen.
   */
  private zeichneDiagonalen() {

    const zeichenContext = this.canvasElement.getContext("2d");

    // Line 1: links oben nach rechts unten
    zeichenContext.lineJoin    = "round";
    zeichenContext.strokeStyle = "#ff0000"; // rot
    zeichenContext.lineWidth   = 2;

    zeichenContext.beginPath;
    zeichenContext.moveTo( 0, 0 );
    zeichenContext.lineTo( this.canvasBreite, this.canvasHoehe ); // x,y
    zeichenContext.closePath();
    zeichenContext.stroke();

    // Linie 2: links unten nach recht oben
    zeichenContext.strokeStyle = "#0000ff"; // blau

    zeichenContext.beginPath();
    zeichenContext.moveTo(                 0, this.canvasHoehe );
    zeichenContext.lineTo( this.canvasBreite, 0                );
    zeichenContext.closePath();
    zeichenContext.stroke();

    console.log("Diagonalen gezeichnet.");
  }

}
