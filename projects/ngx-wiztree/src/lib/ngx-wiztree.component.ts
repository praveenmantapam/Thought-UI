import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, ViewRef } from '@angular/core';
import { NgxWiztreeStepComponent } from './ngx-wiztree-step.component';
import { NgxWiztreeStep } from './ngx-wiztree.model';

@Component({
  selector: 'ngx-wiztree',
  templateUrl: 'ngx-wiztree.component.html',
  styleUrls: ['ngx-wiztree.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxWiztreeComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { read: ElementRef }) containerDiv!: ElementRef<HTMLDivElement>;
  @Input('steps') public steps: Array<NgxWiztreeStep> = [];

  constructor(private vcref: ViewContainerRef, private cdref: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    this.steps.forEach((s, i) => {
      this.containerDiv.nativeElement.className = "step-root"
      this.containerDiv.nativeElement.id = "step-root"
      this.traverseSteps(s, this.containerDiv.nativeElement, "", 1);
    });
    this.ngForCallback();
  }

  public ngOnInit(): void {

  }

  public ngForCallback() {
    let items = document.querySelectorAll("div#wiztree div.active-step");
    items.forEach((e) => {
      let currentStep: HTMLDivElement = document.querySelector(`div[id='${e.id}']`) as HTMLDivElement;
      let parentStep: HTMLDivElement = document.querySelector(`div[id='${e.getAttribute("parentId")}']`) as HTMLDivElement;

      if (parentStep && currentStep) {
        let points: Array<{ x: number, y: number }> = [
          {
            x: parentStep?.offsetLeft + (parentStep.offsetWidth),
            y: parentStep?.offsetTop + (parentStep.offsetHeight / 2)
          },
          {
            x: parentStep?.offsetLeft + (parentStep.offsetWidth) + (Math.abs(currentStep.offsetLeft - parentStep.offsetLeft) / 2),
            y: parentStep?.offsetTop + (parentStep.offsetHeight / 2)
          },
          {
            x: parentStep?.offsetLeft + (parentStep.offsetWidth) + (Math.abs(currentStep.offsetLeft - parentStep.offsetLeft) / 2),
            y: currentStep.offsetTop + (currentStep.offsetHeight / 2)
          },
          {
            x: currentStep.offsetLeft,
            y: currentStep.offsetTop + (currentStep.offsetHeight / 2)
          }
        ];

        let isCompleted: boolean = currentStep.getAttribute("isCompleted") as unknown as boolean;
        let isSuccess: boolean = currentStep.getAttribute("isSuccess") as unknown as boolean;
        let dashedLine: boolean = currentStep.getAttribute("dashedLine") as unknown as boolean;
        let lineThickness: string = currentStep.getAttribute("lineThickness") || "4px";
        let successLineColor: string = currentStep.getAttribute("successLineColor") as "green";
        let failureLineColor: string = currentStep.getAttribute("failureLineColor") as "red";

        this.drawLine(document.querySelector("div[id='wiztree']") as HTMLDivElement, points,
          lineThickness,
          !isCompleted ? "black" : (isCompleted && isSuccess ? successLineColor : failureLineColor), dashedLine
        );
      }
    });
    this.cdref.detectChanges();
  }

  private traverseSteps(step: NgxWiztreeStep, parent: HTMLDivElement, parentId: string, level: number) {
    let cmpId: string = (Math.random() + 1).toString(36).substring(2);
    let cmpParentId: string = parentId;
    let cmpRef = this.vcref.createComponent(NgxWiztreeStepComponent);
    parent.appendChild(cmpRef.location.nativeElement);
    cmpRef.changeDetectorRef.detectChanges();
    cmpRef.instance.stepModel = step;
    cmpRef.instance.cmpId = cmpId;
    cmpRef.instance.cmpParentId = cmpParentId;
    (cmpRef.location.nativeElement as HTMLDivElement).setAttribute("isCompleted", (step.isCompleted || false).toString());
    (cmpRef.location.nativeElement as HTMLDivElement).setAttribute("isSuccess", (step.isSuccess || false).toString());
    (cmpRef.location.nativeElement as HTMLDivElement).setAttribute("dashedLine", (step.dashedLine || false).toString());
    (cmpRef.location.nativeElement as HTMLDivElement).setAttribute("lineThickness", (step.lineThickness || '3px').toString());
    (cmpRef.location.nativeElement as HTMLDivElement).setAttribute("successLineColor", (step.successLineColor || 'green').toString());
    (cmpRef.location.nativeElement as HTMLDivElement).setAttribute("failureLineColor", (step.failureLineColor || 'red').toString());
    (cmpRef.location.nativeElement as HTMLDivElement).classList.add("wizard-step");
    cmpRef.changeDetectorRef.detectChanges();

    if (step.branches) {
      let parentDiv: HTMLDivElement = document.createElement("div");
      parentDiv.id = (Math.random() + 1).toString(36).substring(2);
      parentDiv.setAttribute("parentId", cmpId || '');
      cmpRef.location.nativeElement.appendChild(parentDiv);

      step.branches.forEach((s) => {
        this.traverseSteps(s, parentDiv, cmpId || '', level + 1);
      });
    }
  }

  private drawLine(parent: HTMLDivElement, points: Array<{ x: number, y: number }>, lineThickness: string, lineStroke: string, dashedLines: boolean) {
    let svg: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGElement;
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.width = `${document.querySelector("div[id='wiztree']")?.clientWidth}px`;
    svg.style.height = `${document.querySelector("div[id='wiztree']")?.clientHeight}px`;
    svg.style.left = '0';
    let line: SVGPolylineElement = document.createElementNS(svg.namespaceURI, "polyline") as SVGPolylineElement;
    line.setAttribute("fill", "none");
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("stroke-linejoin", "bevel");
    line.setAttribute("stroke-width", `${lineThickness}px`);
    line.setAttribute("stroke-dasharray", dashedLines ? "2" : "1");
    line.setAttribute("stroke", lineStroke || "black");
    line.setAttribute("points", points.map(m => `${m.x},${m.y}`).join(' '));
    svg.appendChild(line);
    parent.appendChild(svg);
  }
}
