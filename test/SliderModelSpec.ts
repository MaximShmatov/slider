import { SliderModel } from '../src/slider/SliderModel';

describe('SliderModel', () => {
    it('Return name module', () => {
        const sliderModel = new SliderModel('SliderModel');
        expect(sliderModel.moduleName).toBe('SliderModel');
    });
});