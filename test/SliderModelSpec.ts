import {ISliderModel, SliderModel} from '../src/slider/SliderModel';

describe('Slider model tests', () => {
    let config: ISliderModel = {
        minValue: 1,
        maxValue: 10,
        stepSizeValue: 1,
        position: 'h',
        range: false,
        tooltip: false
    };
    const model = new SliderModel(config);
    it('Should assign an minValue property', () => {
        expect(model.minValue).toBeDefined('should be defined');
    });
    it('Should assign an maxValue property', () => {
        expect(model.maxValue).toBeDefined('should be defined');
    });
    it('Should assign an stepSizeValue property', () => {
        expect(model.stepSizeValue).toBeDefined('should be defined');
    });
    it('Should assign an position property', () => {
        expect(model.position).toBeDefined('should be defined');
        expect(model.position).toMatch(/(h|v)/, 'Must be "h" or "v"');
    });
    it('Should assign an range property', () => {
        expect(model.rangeOn).toBeDefined('should be defined');
    });
    it('Should assign an tooltip property', () => {
        expect(model.tooltipOn).toBeDefined('should be defined');
    });
});