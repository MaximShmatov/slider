class SliderController implements ISliderController {
  private model: ISliderModel;
  private view: ISliderView;

  constructor(model: ISliderModel, view: ISliderView) {
    this.model = model;
    this.view = view;
  }
}

export {SliderController};