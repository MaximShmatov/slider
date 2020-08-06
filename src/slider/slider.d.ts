interface ISliderModel {
  minValue: number;
  maxValue: number;
  valueFrom: number;
  valueTo: number;
  stepSize: number;
  onVertical: boolean;
  onRange: boolean;
  onTooltip: boolean;
  onScale: boolean;
  serverURL: URL;

  init(data: HTMLElement | ISliderModel | FormData | null): boolean;

}
interface ISliderView {

}

interface ISliderPresenter {
  initFromDataset(): void;
}

interface IThumb {

}

interface IRail {
  thumbFrom: IThumb;
  thumbTo: IThumb;
  isVertical: boolean;
}

interface IScale {
  setValues(min: number, max: number): void;
}

interface HTMLElementEventMap {
  'slider-pos': CustomEvent;
  'scale-pos': CustomEvent;
  'slider-data': CustomEvent;
  'view-events': CustomEvent;
}


interface JQuery {
  slider(): ISliderPresenter;
}
