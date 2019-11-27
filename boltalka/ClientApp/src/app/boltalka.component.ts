import { Component, Output, ViewChild, ElementRef, AfterViewChecked } from "@angular/core";
import { SenderComponent} from "./sender.component";


@Component({
  selector: 'app-boltalka',
  templateUrl: './boltalka.component.html',
  styleUrls: ['./boltalka.component.css']
})
export class BoltalkaComponent {

    @ViewChild("scrollboard", { static: false }) private myScrollContainer: ElementRef;

    @ViewChild(SenderComponent, { static: false }) private msgsenderComponent: SenderComponent;
    /*
    SmileClickedEventFromMenu(smileid: string): void {
        this.msgsenderComponent.msg += smileid;
        this.msgsenderComponent.onKey(this.msgsenderComponent.msg);
    }
    */
    ngOnInit() { }

    ngAfterViewChecked() { }

    scrollToBottom(): void { }

}
