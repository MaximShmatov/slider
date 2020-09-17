import {SliderView} from '../src/slider/SliderView';
import styles from '../src/slider/slider.module.sass';

describe('Testing module src/slider/SliderView.ts', () => {
  const view = new SliderView(null);
  let slider: SliderView;
  let shadowRoot: ShadowRoot;
  let spySetModelData: jasmine.Spy;
  const model = {
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
    document.body.appendChild(view);
    const element = document.body.querySelector('input-slider');
    if (element instanceof SliderView) {
      slider = element;
      if (slider.shadowRoot) {
        shadowRoot = slider.shadowRoot;
      }
    }
    spySetModelData = spyOn(view, 'setModelData').and.callThrough();
    view.setModelData('minValue', model.minValue);
    view.setModelData('maxValue', model.maxValue);
    view.setModelData('valueFrom', model.valueFrom);
    view.setModelData('valueTo', model.valueTo);
    view.setModelData('onScale', model.onScale);
    view.setModelData('onRange', model.onRange);
    view.setModelData('onVertical', model.onVertical);
    view.setModelData('onTooltip', model.onTooltip);
  });
  afterAll(() => {
    slider.remove();
  })
  it('View should be defined', () => {
    expect(view).toBeDefined();
  });

  describe('Testing element "input-slider"', () => {
    let rail: HTMLElement;
    let scale: HTMLElement;
    beforeAll(() => {
      let element: HTMLElement | null;
      element = shadowRoot.querySelector('input-slider-view-rail');
      if (element) rail = element;
      element = shadowRoot.querySelector('input-slider-view-scale');
      if (element) scale = element;
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
      let thumbFrom: HTMLElement;
      let thumbTo: HTMLElement;
      let progress: HTMLElement;
      beforeAll(() => {
        const thumbs = rail.querySelectorAll('input-slider-view-thumb');
        if (thumbs[0] instanceof HTMLElement) thumbFrom = thumbs[0];
        if (thumbs[1] instanceof HTMLElement) thumbTo = thumbs[1];
        let element = rail.querySelector('input-slider-view-progress');
        if (element instanceof HTMLElement) progress = element;
      });
      it('Must include element "input-slider-view-progress"', () => {
        expect(progress).toBeDefined();
      })
      it('Must include "input-slider-view-thumb" (thumb from)', () => {
        expect(thumbFrom).toBeDefined();
      });
      it('Must include "input-slider-view-thumb" (thumb to)', () => {
        expect(thumbTo).toBeDefined();
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
      it('Should switch to horizontal or vertical position', () => {
        if(rail.getAttribute('data-on-vertical') === 'true') {
          expect(rail.className).toContain(styles.locals.rail_ver);
        } else {
          expect(rail.className).not.toContain(styles.locals.rail_ver);
        }
      });
      describe('Testing element "input-slider-view-thumb"', () => {

      });

      describe('Testing element "input-slider-view-progress"', () => {
        const positionFrom: number = (model.valueFrom - model.minValue) / ((model.maxValue - model.minValue) / 100);
        const positionTo: number = (model.valueTo - model.minValue) / ((model.maxValue - model.minValue) / 100);

        it('The attribute "class" must be set to "progress"', () => {
          expect(progress.getAttribute('class')).toContain(styles.locals.progress);
        });
        it(`The attribute "data-position-from" must be set to "${positionFrom}"`, () => {
          expect(progress.getAttribute('data-position-from')).toEqual(positionFrom.toString());
        });
        it(`The attribute "data-position-to" must be set to "${positionTo}"`, () => {
          expect(progress.getAttribute('data-position-to')).toEqual(positionTo.toString());
        });
        it(`The attribute "data-on-range" must be set to "${model.onRange}"`, () => {
          expect(progress.getAttribute('data-on-range')).toEqual(String(model.onRange));
        });
        it(`The attribute "data-on-vertical" must be set to "${model.onVertical}"`, () => {
          expect(progress.getAttribute('data-on-vertical')).toEqual(String(model.onVertical));
        });
        it('M')
      });
    });

    describe('Testing element "input-slider-view-scale"', () => {
      let values: HTMLElement;
      let valuesItem: NodeListOf<HTMLElement>;
      let wrapper: HTMLElement;
      let division: NodeListOf<HTMLElement>;
      let subdivision: NodeListOf<HTMLElement>;
      beforeAll(() => {
        let element = scale.querySelector(`.${styles.locals.scale__values}`);
        if (element instanceof HTMLElement) values = element;
        element = scale.querySelector(`.${styles.locals.scale__wrapper}`);
        if (element instanceof HTMLElement) wrapper = element;
        valuesItem = scale.querySelectorAll(`.${styles.locals.scale__valuesItem}`);
        division = scale.querySelectorAll(`.${styles.locals.scale__division}`);
        subdivision = scale.querySelectorAll(`.${styles.locals.scale__subdivision}`);
      });
      it('The attribute "class" must be set to "scale"', () => {
        expect(scale.getAttribute('class')).toContain(styles.locals.scale);
      });
      it('Must include four elements with class "scale__valuesItem" ', () => {
        expect(valuesItem.length).toEqual(4);
      });
      it('Must include element with class "scale__wrapper" ', () => {
        expect(wrapper).toBeDefined();
      });
      it('Must include element with class "scale__values" ', () => {
        expect(values).toBeDefined();
      });
      it('Must include three elements with class "scale__division" ', () => {
        expect(division.length).toEqual(3);
      });
      it('Must include 15 elements with class "scale__subdivision" ', () => {
        expect(subdivision.length).toEqual(15);
      });
      it(`The attribute "data-min-value" must be set to "${model.minValue}"`, () => {
        expect(scale.getAttribute('data-min-value')).toEqual(model.minValue.toString());
      });
      it(`The attribute "data-max-value" must be set to "${model.maxValue}"`, () => {
        expect(scale.getAttribute('data-max-value')).toEqual(model.maxValue.toString());
      });
      it(`The attribute "data-on-vertical" must be set to "${model.onVertical}"`, () => {
        expect(scale.getAttribute('data-on-vertical')).toEqual(String(model.onVertical));
      });
      it(`The attribute "data-on-range" must be set to "${model.onRange}"`, () => {
        expect(scale.getAttribute('data-on-range')).toEqual(String(model.onRange));
      });
      it(`The first element with class "scale_valuesItem" must have text content ${model.minValue}`, () => {
        expect(valuesItem[0].textContent).toEqual(model.minValue.toString());
      });
      it(`The last element with class "scale_valuesItem" must have text content ${model.maxValue}`, () => {
        expect(valuesItem[valuesItem.length - 1].textContent).toEqual(model.maxValue.toString());
      });
      it(`On event "mousedown" should dispatch event "slider-view"`, () => {
        let customEvent: CustomEvent | undefined = undefined;
        scale.addEventListener('slider-view', (evt: CustomEvent) => {
          customEvent = evt;
        });
        scale.dispatchEvent(new Event('mousedown'));
        expect(customEvent).toBeDefined();
      });

      describe('Vertical and horizontal switching tests', () => {
        let onVertical: boolean;
        beforeAll(() => {
          onVertical = scale.getAttribute('data-on-vertical') === 'true';
        });
        it('Class "scale_ver" must be added or removed to the element with the class "scale"', () => {
          if (onVertical) {
            expect(scale.className).toContain(styles.locals.scale_ver);
          } else {
            expect(scale.className).not.toContain(styles.locals.scale_ver);
          }
        });
        it('Class "scale__wrapper_ver" must be added or removed to the element with the class "scale__wrapper"', () => {
          if (onVertical) {
            expect(wrapper.className).toContain(styles.locals.scale__wrapper_ver);
          } else {
            expect(wrapper.className).not.toContain(styles.locals.scale__wrapper_ver);
          }
        });
        it('Class "scale__values_ver" must be added or removed to the element with the class "scale__values"', () => {
          if (onVertical) {
            expect(values.className).toContain(styles.locals.scale__values_ver);
          } else {
            expect(values.className).not.toContain(styles.locals.scale__values_ver);
          }
        });
        it('Class "scale__valuesItem_ver" must be added or removed to the all elements with the class "scale__valuesItem"', () => {
          if (onVertical) {
            valuesItem.forEach((element) => {
              expect(element.className).toContain(styles.locals.scale__valuesItem_ver);
            });
          } else {
            valuesItem.forEach((element) => {
              expect(element.className).not.toContain(styles.locals.scale__valuesItem_ver);
            });
          }
        });
        it('Class "scale__division_ver" must be added or removed to the all elements with the class "scale__division"', () => {
          if (onVertical) {
            division.forEach((element) => {
              expect(element.className).toContain(styles.locals.scale__division_ver);
            });
          } else {
            division.forEach((element) => {
              expect(element.className).not.toContain(styles.locals.scale__division_ver);
            });
          }
        });
        it('Class "scale__subdivision_ver" must be added or removed to the all elements with the class "scale__subdivision"', () => {
          if (onVertical) {
            subdivision.forEach((element) => {
              expect(element.className).toContain(styles.locals.scale__subdivision_ver);
            });
          } else {
            subdivision.forEach((element) => {
              expect(element.className).not.toContain(styles.locals.scale__subdivision_ver);
            });
          }
        });
      });
    });
  });
});