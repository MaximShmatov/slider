import {SliderView} from '../src/slider/SliderView';
import styles from '../src/slider/slider.module.sass';

describe('Testing module src/slider/SliderView.ts', () => {
  const view = new SliderView(null);
  let spySetModelData: jasmine.Spy;
  const model = {
    minValue: 12,
    maxValue: 105,
    valueFrom: 33,
    valueTo: 17,
    onRange: true,
    onTooltip: true,
    onVertical: true,
    onScale: true,
  }

  beforeAll(() => {
    document.body.appendChild(view);
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
  it('View should be defined', () => {
    expect(view).toBeInstanceOf(SliderView);
  });

  describe('Testing element "input-slider"', () => {
    let slider: HTMLElement;
    let rail: HTMLElement;
    let scale: HTMLElement;
    let shadowRoot: ShadowRoot;
    beforeAll(() => {
      let element: HTMLElement | null;
      element = document.body.querySelector('input-slider');
      if (element instanceof SliderView) {
        slider = element;
        if (slider.shadowRoot) {
          shadowRoot = slider.shadowRoot;
        }
      }
      element = shadowRoot.querySelector('input-slider-view-rail');
      if (element) rail = element;
      element = shadowRoot.querySelector('input-slider-view-scale');
      if (element) scale = element;
    });
    afterAll(() => {
      slider.remove();
    })
    it('Property view.presenter should be set to null', () => {
      expect(view.presenter).toBeNull();
    });
    it('"View.shadowRoot" element should be defined', () => {
      expect(shadowRoot).toBeInstanceOf(ShadowRoot);
    });
    it('The "setModelData" method must be called 8 times', () => {
      expect(spySetModelData.calls.count()).toEqual(8);
    });
    it('Element "input-slider" should be added to page', () => {
      expect(slider).toBe(view);
    });
    it('The attribute "class" of the "input-slider" element must be set to "input-slider-view"', () => {
      expect(slider).toHaveClass('input-slider-view');
    });
    it('The "view.shadowRoot" element must include "input-slider-view-rail"', () => {
      expect(rail).toBeInstanceOf(HTMLElement)
    });
    it('The "view.shadowRoot" element must include "input-slider-view-scale"', () => {
      expect(scale).toBeInstanceOf(HTMLElement)
    });
    it('The "view.shadowRoot" element must include style element', () => {
      expect(shadowRoot.querySelector('style')).toBeInstanceOf(HTMLElement);
    });
    it('Should switch on/off scale', () => {
      if (model.onScale) {
        expect(scale.style.display).toEqual('');
      } else {
        expect(scale.style.display).toEqual('none');
      }
    });

    describe('Testing element "input-slider-view-rail"', () => {
      const positionFrom: number = (model.valueFrom - model.minValue) / ((model.maxValue - model.minValue) / 100);
      const positionTo: number = (model.valueTo - model.minValue) / ((model.maxValue - model.minValue) / 100);
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
        expect(progress).toBeInstanceOf(HTMLElement);
      })
      it('Must include "input-slider-view-thumb" (thumb from)', () => {
        expect(thumbFrom).toBeInstanceOf(HTMLElement);
      });
      it('Must include "input-slider-view-thumb" (thumb to)', () => {
        expect(thumbTo).toBeInstanceOf(HTMLElement);
      });
      it('The attribute "class" must be set to "rail"', () => {
        expect(rail).toHaveClass(styles.locals.rail);
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
        if (model.onVertical) {
          expect(rail).toHaveClass(styles.locals.rail_ver);
        } else {
          expect(rail).not.toHaveClass(styles.locals.rail_ver);
        }
      });
      it('Should switch on/off thumbTo', () => {
        if (model.onRange) {
          expect(thumbTo.style.display).not.toEqual('none');
        } else {
          expect(thumbTo.style.display).toEqual('none');
        }
      });

      describe('Testing element "input-slider-view-progress"', () => {
        it('The attribute "class" must be set to "progress"', () => {
          expect(progress).toHaveClass(styles.locals.progress);
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
        it('Should switch to horizontal or vertical position', () => {
          if (model.onVertical) {
            expect(progress).toHaveClass(styles.locals.progress_ver);
          } else {
            expect(progress).not.toHaveClass(styles.locals.rail_ver);
          }
        });
        it('Positions (top, right, bottom, lef) must be set ', () => {
          if (model.onVertical) {
            expect(Number(progress.style.top.slice(0, -1))).toBeCloseTo(positionFrom);
            if (model.onRange) {
              expect(Number(progress.style.bottom.slice(0, -1))).toBeCloseTo(100 - positionTo);
            } else {
              expect(progress.style.bottom).toEqual('0px');
            }
          } else {
            expect(Number(progress.style.left.slice(0, -1))).toBeCloseTo(positionFrom);
            if (model.onRange) {
              expect(Number(progress.style.right.slice(0, -1))).toBeCloseTo(100 - positionTo);
            } else {
              expect(progress.style.right).toEqual('0px');
            }
          }
        });
      });

      describe('Testing element "input-slider-view-thumb"', () => {
        let tooltipFrom: HTMLElement;
        let tooltipTo: HTMLElement;
        beforeAll(() => {
          let element: HTMLElement | null;
          element = thumbFrom.querySelector(`.${styles.locals.thumb__tooltip}`);
          if (element) tooltipFrom = element;
          element = thumbTo.querySelector(`.${styles.locals.thumb__tooltip}`);
          if (element) tooltipTo = element;
        });
        it('The attribute "class" must be set to "thumb"', () => {
          expect(thumbFrom).toHaveClass(styles.locals.thumb);
          expect(thumbTo).toHaveClass(styles.locals.thumb);
        });
        it('Must include tooltip', () => {
          expect(tooltipFrom).toBeInstanceOf(HTMLElement);
          expect(tooltipTo).toBeInstanceOf(HTMLElement);
        });
        it(`The attribute "data-value" must be set to valueFrom or valueTo (${model.valueFrom}/${model.valueTo})`, () => {
          expect(thumbFrom.getAttribute('data-value')).toEqual(model.valueFrom.toString());
          expect(thumbTo.getAttribute('data-value')).toEqual(model.valueTo.toString());
        });
        it(`The attribute "data-position" must be set to positionFrom or positionTo (${positionFrom}/${positionTo})`, () => {
          expect(thumbFrom.getAttribute('data-position')).toEqual(positionFrom.toString());
          expect(thumbTo.getAttribute('data-position')).toEqual(positionTo.toString());
        });
        it(`The attribute "data-on-vertical" must be set to "${model.onVertical}"`, () => {
          expect(thumbFrom.getAttribute('data-on-vertical')).toEqual(String(model.onVertical));
          expect(thumbTo.getAttribute('data-on-vertical')).toEqual(String(model.onVertical));
        });
        it(`The attribute "data-on-tooltip" must be set to "${model.onTooltip}"`, () => {
          expect(thumbFrom.getAttribute('data-on-tooltip')).toEqual(String(model.onTooltip));
          expect(thumbTo.getAttribute('data-on-tooltip')).toEqual(String(model.onTooltip));
        });
        it(`Must be set text content from tooltipFrom (${model.valueFrom}) or tooltipTo (${model.valueTo})`, () => {
          expect(tooltipFrom.textContent).toEqual(model.valueFrom.toFixed());
          expect(tooltipTo.textContent).toEqual(model.valueTo.toFixed());
        });
        it('Should be set left or top positions ', () => {
          if (model.onVertical) {
            expect(Number(thumbFrom.style.top.slice(0, -1))).toBeCloseTo(positionFrom);
            expect(Number(thumbTo.style.top.slice(0, -1))).toBeCloseTo(positionTo);
            expect(thumbFrom.style.left).toEqual('0px');
            expect(thumbTo.style.left).toEqual('0px');
          } else {
            expect(Number(thumbFrom.style.left.slice(0, -1))).toBeCloseTo(positionFrom);
            expect(Number(thumbTo.style.left.slice(0, -1))).toBeCloseTo(positionTo);
            expect(thumbFrom.style.top).toEqual('0px');
            expect(thumbTo.style.top).toEqual('0px');
          }
        });
        it('Should switch to horizontal or vertical position', () => {
          if (model.onVertical) {
            expect(thumbFrom).toHaveClass(styles.locals.thumb_ver);
            expect(thumbTo).toHaveClass(styles.locals.thumb_ver);
            expect(tooltipFrom).toHaveClass(styles.locals.thumb__tooltip_ver);
            expect(tooltipTo).toHaveClass(styles.locals.thumb__tooltip_ver);
          } else {
            expect(thumbFrom).not.toHaveClass(styles.locals.thumb_ver);
            expect(thumbTo).not.toHaveClass(styles.locals.thumb_ver);
            expect(tooltipFrom).not.toHaveClass(styles.locals.thumb__tooltip_ver);
            expect(tooltipTo).not.toHaveClass(styles.locals.thumb__tooltip_ver);
          }
        });
        it('Should switch on/off tooltip', () => {
          if (model.onTooltip) {
            expect(tooltipFrom.style.display).toEqual('');
            expect(tooltipTo.style.display).toEqual('');
          } else {
            expect(tooltipFrom.style.display).toEqual('none');
            expect(tooltipTo.style.display).toEqual('none');
          }
        });
        it(`On event "mouseup->mousemove" should dispatch event "slider-view" from thumbFrom`, () => {
          let customEvent: CustomEvent | undefined = undefined;
          thumbFrom.addEventListener('slider-view', (evt: CustomEvent) => {
            customEvent = evt;
          });
          thumbFrom.dispatchEvent(new Event('mousedown'));
          document.dispatchEvent(new Event('mousemove'));
          expect(customEvent).toBeDefined();
        });
        it(`On event "mouseup->mousemove" should dispatch event "slider-view" from thumbTo`, () => {
          let customEvent: CustomEvent | undefined = undefined;
          thumbTo.addEventListener('slider-view', (evt: CustomEvent) => {
            customEvent = evt;
          });
          thumbTo.dispatchEvent(new Event('mousedown'));
          document.dispatchEvent(new Event('mousemove'));
          expect(customEvent).toBeDefined();
        });
      });
    });

    describe('Testing element "input-slider-view-scale"', () => {
      let values: HTMLElement;
      let valuesItem: NodeListOf<HTMLElement>;
      let wrapper: HTMLElement;
      let division: NodeListOf<HTMLElement>;
      let subdivision: NodeListOf<HTMLElement>;
      beforeAll(() => {
        let element: HTMLElement | null;
        element = scale.querySelector(`.${styles.locals.scale__values}`);
        if (element) values = element;
        element = scale.querySelector(`.${styles.locals.scale__wrapper}`);
        if (element) wrapper = element;
        valuesItem = scale.querySelectorAll(`.${styles.locals.scale__valuesItem}`);
        division = scale.querySelectorAll(`.${styles.locals.scale__division}`);
        subdivision = scale.querySelectorAll(`.${styles.locals.scale__subdivision}`);
      });
      it('The attribute "class" must be set to "scale"', () => {
        expect(scale).toHaveClass(styles.locals.scale);
      });
      it('Must include four elements with class "scale__valuesItem" ', () => {
        expect(valuesItem.length).toEqual(4);
      });
      it('Must include element with class "scale__wrapper" ', () => {
        expect(wrapper).toBeInstanceOf(HTMLElement);
      });
      it('Must include element with class "scale__values" ', () => {
        expect(values).toBeInstanceOf(HTMLElement);
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
        it('The "scale_ver" class must be toggled for the "scale" element', () => {
          if (model.onVertical) {
            expect(scale).toHaveClass(styles.locals.scale_ver);
          } else {
            expect(scale).not.toHaveClass(styles.locals.scale_ver);
          }
        });
        it('The "wrapper_ver" class must be toggled for the "wrapper" element', () => {
          if (model.onVertical) {
            expect(wrapper).toHaveClass(styles.locals.scale__wrapper_ver);
          } else {
            expect(wrapper).not.toHaveClass(styles.locals.scale__wrapper_ver);
          }
        });
        it('The "scale__values_ver" class must be toggled for the "values" element', () => {
          if (model.onVertical) {
            expect(values).toHaveClass(styles.locals.scale__values_ver);
          } else {
            expect(values).not.toHaveClass(styles.locals.scale__values_ver);
          }
        });
        it('The "scale__valuesItem_ver" class must be toggled for the all "valuesItem" elements', () => {
          if (model.onVertical) {
            valuesItem.forEach((element) => {
              expect(element).toHaveClass(styles.locals.scale__valuesItem_ver);
            });
          } else {
            valuesItem.forEach((element) => {
              expect(element).not.toHaveClass(styles.locals.scale__valuesItem_ver);
            });
          }
        });
        it('The "scale__division_ver" class must be toggled for the all "division" elements', () => {
          if (model.onVertical) {
            division.forEach((element) => {
              expect(element).toHaveClass(styles.locals.scale__division_ver);
            });
          } else {
            division.forEach((element) => {
              expect(element).not.toHaveClass(styles.locals.scale__division_ver);
            });
          }
        });
        it('The "scale__subdivision_ver" class must be toggled for the all "subdivision" elements', () => {
          if (model.onVertical) {
            subdivision.forEach((element) => {
              expect(element).toHaveClass(styles.locals.scale__subdivision_ver);
            });
          } else {
            subdivision.forEach((element) => {
              expect(element).not.toHaveClass(styles.locals.scale__subdivision_ver);
            });
          }
        });
      });
    });
  });
});