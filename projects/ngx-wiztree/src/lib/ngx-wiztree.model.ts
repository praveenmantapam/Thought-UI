import { FunctionExpr } from "@angular/compiler";

export interface NgxWiztreeStep {
  title?: string;
  stepClass?: string;
  stepIndex?: number;
  innerText?: string;
  innerTextClass?: string;
  outerText?: string;
  outerTextClass?: string;
  iconUrl?: string;
  iconClass?: string;
  isCompleted?: boolean;
  isSuccess?: boolean;
  dashedLine?: boolean;
  lineThickness?: boolean;
  successLineColor?: string;
  failureLineColor?: string;
  beforeLoad?: Function;
  onClick?: Function;
  beforeLeave?: Function;
  branches?: Array<NgxWiztreeStep>;
}
