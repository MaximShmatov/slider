import {SliderView} from '../src/slider/SliderView';
import styles from '../src/slider/slider.module.sass';

describe('Testing module src/slider/SliderView.ts', () => {
  let view: SliderView;
  let slider: SliderView;
  let shadowRoot: ShadowRoot;
  let spySetModelData: jasmine.Spy;
  let model = {
    minValue: 0,
    maxValue: 100,
    valueFrom: 10,
    valueTo: 90,
    stepSize: 1,
    onRange: true,
    onTooltip: true,
    onVertical: true,
    onScale: true,
  }

  beforeAll(() => {
    view = new SliderView(null);
    document.body.appendChild(view);
    const element = document.body.querySelector('input-slider');
    if (element && element.shadowRoot) {
      slider = <SliderView>element;
      shadowRoot = <ShadowRoot>slider.shadowRoot;
      spySetModelData = spyOn(view, 'setModelData').and.callThrough();
      view.setModelData('minValue', model.minValue);
      view.setModelData('maxValue', model.maxValue);
      view.setModelData('valueFrom', model.valueFrom);
      view.setModelData('valueTo', model.valueTo);
      view.setModelData('onScale', model.onScale);
      view.setModelData('onRange', model.onRange);
      view.setModelData('onVertical', model.onVertical);
      view.setModelData('onTooltip', model.onTooltip);
    }
  });
  afterAll(() => {
    slider.remove();
  })
  it('View should be defined', () => {
    expect(view).toBeDefined();
  });

  describe('Testing element "input-slider"', () => {
    let rail!: HTMLElement;
    let scale: HTMLElement;
    beforeAll(() => {
      let element: HTMLElement | null;
      element = shadowRoot.querySelector('input-slider-view-rail');
      if (element) rail = <HTMLElement>element;
      element = shadowRoot.querySelector('input-slider-view-scale');
      if (element) scale = <HTMLElement>element;
    });
    it('Property view.presenter should be set to null', () => {
      expect(view.presenter).toBeNull();
    });
    it('"View.shadowRoot" element should be defined', () => {
      expect(shadowRoot).toBeDefined();
    });
    it('The "setModelData" method must be called 8 times', () => {
      expect(spySetModelData.calls.count()).toEqual(8);
    });
    it('Element "input-slider" should be added to page', () => {
      expect(slider).toBe(view);
    });
    it('The attribute "class" of the "input-slider" element must be set to "input-slider-view"', () => {
      expect(slider.getAttribute('class')).toContain('input-slider-view');
    });
    it('The "view.shadowRoot" element must include "input-slider-view-rail"', () => {
      expect(rail).toBeDefined();
    });
    it('The "view.shadowRoot" element must include "input-slider-view-scale"', () => {
      expect(scale).toBeDefined();
    });
    it('The "view.shadowRoot" element must include style element', () => {
      expect(shadowRoot.querySelectorAll('style').length).toEqual(1);
    });

    describe('Testing element "input-slider-view-rail"', () => {
      let thumbs: NodeList;
      let progress: HTMLElement;
      beforeAll(() => {
        thumbs = rail.querySelectorAll('input-slider-view-thumb');
        let element = rail.querySelector('input-slider-view-progress');
        if (element) progress = <HTMLElement>element;
      });
      it('Must include element "input-slider-view-progress"', () => {
        expect(progress).toBeDefined();
      })
      it('Must include two elements "input-slider-view-thumb"', () => {
        expect(thumbs.length).toEqual(2);
      });
      it('The attribute "class" must be set to "rail"', () => {
        expect(rail.getAttribute('class')).toContain(styles.locals.rail);
      });
      it(`The attribute "data-min-value" must be set to "${model.minValue}"`, () => {
        expect(rail.getAttribute('data-min-value')).toEqual(model.minValue.toString());
      });
      it(`The attribute "data-max-value" must be set to "${model.maxValue}"`, () => {
        expect(rail.getAttribute('data-max-value')).toEqual(model.maxValue.toString());
      });
      it(`The attribute "data-value-from" must be set to "${model.valueFrom}"`, () => {
        expect(rail.getAttribute('data-value-from')).toEqual(model.valueFrom.toString());
      });
      it(`The attribute "data-value-to" must be set to "${model.valueTo}"`, () => {
        expect(rail.getAttribute('data-value-to')).toEqual(model.valueTo.toString());
      });
      it(`The attribute "data-on-tooltip" must be set to "${model.onTooltip}"`, () => {
        expect(rail.getAttribute('data-on-tooltip')).toEqual(String(model.onTooltip));
      });
      it(`The attribute "data-on-range" must be set to "${model.onRange}"`, () => {
        expect(rail.getAttribute('data-on-range')).toEqual(String(model.onRange));
      });
      it(`The attribute "data-on-vertical" must be set to "${model.onVertical}"`, () => {
        expect(rail.getAttribute('data-on-vertical')).toEqual(String(model.onVertical));
      });
    });

    describe('Testing element "input-slider-view-scale"', () => {
      it(`The attribute "data-min-value" must be set to "${model.minValue}"`, () => {
        expect(scale.getAttribute('data-min-value')).toEqual(model.minValue.toString());
      });
      it(`The attribute "data-max-value" must be set to "${model.maxValue}"`, () => {
        expect(scale.getAttribute('data-max-value')).toEqual(model.maxValue.toString());
      });
      it(`The attribute "data-on-vertical" must be set to "${model.onVertical}"`, () => {
        expect(scale.getAttribute('data-on-vertical')).toEqual(String(model.onVertical));
      });
    });

  });
});