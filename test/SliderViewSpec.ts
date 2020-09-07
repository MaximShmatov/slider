import {SliderView} from '../src/slider/SliderView';


describe('src/slider/SliderView.ts tests', () => {
  let view: SliderView;

  beforeAll(() => {
    view = new SliderView(null);
  });

  it('Should be defined View', () => {
    expect(view).toBeDefined('should be defined');
  });

  it('Should be defined view.slider', () => {
    expect(view.slider).toBeDefined('should be defined');
  });
});