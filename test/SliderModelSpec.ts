import {SliderModel} from '../src/slider/SliderModel';
import {ISliderModel} from '../src/slider/ISliderModel';


describe('Slider model tests', () => {
  let model: SliderModel;

  beforeAll(async () => {
    let form: FormData = new FormData();
    form.append('variant', '0');
    let res: Response = await fetch('http://localhost:9000/slider', {method: 'POST', body: form});
    let conf: ISliderModel = await res.json();
    model = new SliderModel(conf);
  });

  it('Should assign an minValue property', () => {
    expect(model.minValue).toBeDefined('should be defined');
  });
  it('Should assign an maxValue property', () => {
    expect(model.maxValue).toBeDefined('should be defined');
  });
  it('Should assign an currentValue property', () => {
    expect(model.currentValue).toBeDefined('should be defined');
  });
  it('Should assign an stepSizeValue property', () => {
    expect(model.stepSizeValue).toBeDefined('should be defined');
  });
  it('Should assign an position property', () => {
    expect(model.position).toBeDefined('should be defined');
  });
  it('Should assign an range property', () => {
    expect(model.rangeOn).toBeDefined('should be defined');
  });
  it('Should assign an tooltip property', () => {
    expect(model.tooltipOn).toBeDefined('should be defined');
  });
});