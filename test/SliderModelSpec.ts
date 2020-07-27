import {SliderModel} from '../src/slider/SliderModel';


describe('Slider model tests', () => {
  let model: SliderModel;

  beforeEach(() => {
    model = new SliderModel(null);
  });

  it('Should assign an minValue property', () => {
    expect(model.getMinValue).toBeDefined('should be defined');
  });
  it('Should assign an maxValue property', () => {
    expect(model.getMaxValue).toBeDefined('should be defined');
  });
  it('Should assign an valueStart property', () => {
    expect(model.getValueFrom).toBeDefined('should be defined');
  });
  it('Should assign an valueEnd property', () => {
    expect(model.getValueTo).toBeDefined('should be defined');
  });
  it('Should assign an stepSizeValue property', () => {
    expect(model.getStepSize).toBeDefined('should be defined');
  });
  it('Should assign an position property', () => {
    expect(model.isVertical).toBeDefined('should be defined');
  });
  it('Should assign an range property', () => {
    expect(model.isRange).toBeDefined('should be defined');
  });
  it('Should assign an tooltip property', () => {
    expect(model.isTooltip).toBeDefined('should be defined');
  });
});