import {ISliderModel, SliderModel} from '../src/slider/SliderModel';
// async function getConfigSlider(): Promise <ISliderModel | null> {
//     let form: FormData = new FormData();
//     form.append('variant', '0');
//
//     try {
//         let response = await fetch('http://localhost:9000/slider', {method: 'POST', body: form});
//         console.log(response.status);
//         return await response.json();
//     } catch(err) {
//         console.log(err.name);
//         console.log(err.message);
//     }
//     console.log('222222222');
//     return null;
// }


describe('Slider model tests', () => {
    let model: SliderModel;
    let head = {
        //"Authorization": "Basic YWxhZGRpbjpvcGVuc2VzYW1l",
        "Access-Control-Allow-Origin": "*"
    };


    beforeAll( async () => {
        console.log('111111111');
        let form: FormData = new FormData();
        form.append('variant', '0');
        let res = await fetch('http://localhost:9000/slider', {
            method: 'POST',
            //headers: head,
            mode: "no-cors",
            body: form
        });
        console.log(res.ok);
        console.log(res.status);

        console.log('333333333');
    });

    it('Should assign an minValue property', () => {
        console.log(model);
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
        expect(model.position).toMatch(/(v|h)/, 'Must be "h" or "v"');
    });
    it('Should assign an range property', () => {
        expect(model.rangeOn).toBeDefined('should be defined');
    });
    it('Should assign an tooltip property', () => {
        expect(model.tooltipOn).toBeDefined('should be defined');
    });
});