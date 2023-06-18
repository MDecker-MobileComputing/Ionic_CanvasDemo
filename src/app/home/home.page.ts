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

  private initCanvas() {

    const viewportBreite = this.platform.width();
    const viewportHoehe  = this.platform.height();
    console.log(`Viewport: breite=${viewportBreite}px, hoehe=${viewportHoehe}px`);

    this.canvasElement = this.canvas.nativeElement;

    this.canvasElement.width  = viewportBreite*0.90 + "";
    this.canvasElement.height = viewportHoehe *0.60 + "";

    this.canvasBreite = this.canvasElement.width;
    this.canvasHoehe  = this.canvasElement.height;

    console.log(`Canvas: breite=${this.canvasElement.width}px, hoehe=${this.canvasElement.height}px`);

    this.zeichneDiagonalen();
  }

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

  }

}
