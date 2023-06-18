import { Component, ViewChild, AfterViewInit } from '@angular/core';
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

  /**
   * Constructor for Dependency Injection.
   */
  constructor(private platform: Platform) {}

  /**
   * Lifecycle-Methode. Einzige Methode aus Interface AfterViewInit.
   * <br><br>
   *
   * Werkzeug zur Messung aktuelle Viewport-Größe im Browser: https://whatismyviewport.com/
   */
  public ngAfterViewInit() {

    const viewportBreite = this.platform.width();
    const viewportHoehe  = this.platform.height();
    console.log(`Viewport: breite=${viewportBreite}px, hoehe=${viewportHoehe}px`);

    this.canvasElement = this.canvas.nativeElement;

    this.canvasElement.width  = viewportBreite*0.98 + "";
    this.canvasElement.height = viewportHoehe *0.60 + "";

    console.log(`Canvas: breite=${this.canvasElement.width}px, hoehe=${this.canvasElement.height}px`);

    this.zeichneDiagonalen();
  }

  private zeichneDiagonalen() {

    const zeichenContext = this.canvasElement.getContext("2d");

    zeichenContext.lineJoin    = "round";
    zeichenContext.strokeStyle = "#ff0000"; // rot
    zeichenContext.lineWidth   = 2;

    zeichenContext.beginPath;
    zeichenContext.moveTo( 0, 0 );
    zeichenContext.lineTo( this.canvasElement.width, this.canvasElement.height ); // x,y
    zeichenContext.closePath();

    zeichenContext.stroke();

  }

}
