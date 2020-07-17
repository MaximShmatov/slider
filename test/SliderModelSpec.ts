import {SliderModel} from '../src/slider/SliderModel';


describe('Slider model tests', () => {
  let model: SliderModel;

  beforeEach(() => {
    model = new SliderModel();
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
    expect(model.onVertical).toBeDefined('should be defined');
  });
  it('Should assign an range property', () => {
    expect(model.onRange).toBeDefined('should be defined');
  });
  it('Should assign an tooltip property', () => {
    expect(model.onTooltip).toBeDefined('should be defined');
  });
});