import { Component, ViewChild } from "@angular/core";
import { SignaturePad } from "angular2-signaturepad";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Lmis: Draw signture and drag to pdf document";
}
