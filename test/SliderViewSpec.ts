import styles from '../src/components/range-slider/slider.module.sass';
import { data } from './TestData';

describe('TESTING MODULE SRC/SLIDER/SLIDERVIEW.TS', () => {
  const view = <ISliderView>document.createElement('input-slider');
  let spySetModelData: jasmine.Spy;

  beforeAll(() => {
    document.body.appendChild(view);
    spySetModelData = spyOn(view, 'setModelData').and.callThrough();
    view.setModelData('minValue', data.minValue);
    view.setModelData('maxValue', data.maxValue);
    view.setModelData('valueFrom', data.valueFrom);
    view.setModelData('valueTo', data.valueTo);
    view.setModelData('isScale', data.isScale);
    view.setModelData('isRange', data.isRange);
    view.setModelData('isVertical', data.isVertical);
    view.setModelData('isTooltip', data.isTooltip);
  });
  afterAll(() => {
    view.remove();
  });
  it('View should be defined', () => {
    expect(view).toBeDefined();
  });

  describe('Testing element "input-range-slider"', () => {
    let slider: HTMLElement;
    let rail: HTMLElement;
    let scale: HTMLElement;
    let shadowRoot: ShadowRoot;
    beforeAll(() => {
      let element: HTMLElement | null;
      element = document.body.querySelector('input-slider');
      if (element) {
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
    });
    it('Property view.presenter should be set to  null', () => {
      expect(view.presenter).toBeUndefined();
    });
    it('"View.shadowRoot" element should be defined', () => {
      expect(shadowRoot).toBeInstanceOf(ShadowRoot);
    });
    it('The "setModelData" method must be called 8 times', () => {
      expect(spySetModelData.calls.count()).toEqual(8);
    });
    it('Element "input-range-slider" should be added to page', () => {
      expect(slider).toBe(view);
    });
    it('The "view.shadowRoot" element must include "input-range-slider-view-rail"', () => {
      expect(rail).toBeInstanceOf(HTMLElement);
    });
    it('The "view.shadowRoot" element must include "input-range-slider-view-scale"', () => {
      expect(scale).toBeInstanceOf(HTMLElement);
    });
    it('The "view.shadowRoot" element must include style element', () => {
      expect(shadowRoot.querySelector('style')).toBeInstanceOf(HTMLElement);
    });
    it('Should switch on/off scale', () => {
      if (data.isScale) {
        expect(scale.style.display).toEqual('');
      } else {
        expect(scale.style.display).toEqual('none');
      }
    });

    describe('Testing element "input-range-slider-view-rail"', () => {
      let positionFrom = (data.valueFrom - data.minValue);
      positionFrom /= (data.maxValue - data.minValue) / 100;
      let positionTo = (data.valueTo - data.minValue);
      positionTo /= ((data.maxValue - data.minValue) / 100);
      let thumbFrom: HTMLElement;
      let thumbTo: HTMLElement;
      let progress: HTMLElement;
      beforeAll(() => {
        [thumbFrom, thumbTo] = <HTMLElement[]>Array.from(rail.querySelectorAll('input-slider-view-thumb'));
        const element = rail.querySelector('input-slider-view-progress');
        if (element instanceof HTMLElement) progress = element;
      });
      it('Must include element "input-range-slider-view-progress"', () => {
        expect(progress).toBeInstanceOf(HTMLElement);
      });
      it('Must include "input-range-slider-view-thumb" (thumb from)', () => {
        expect(thumbFrom).toBeInstanceOf(HTMLElement);
      });
      it('Must include "input-range-slider-view-thumb" (thumb to)', () => {
        expect(thumbTo).toBeInstanceOf(HTMLElement);
      });
      it('The attribute "class" must be set to "rail"', () => {
        expect(rail).toHaveClass(styles.locals.rail);
      });
      it(`The attribute "data-min-value" must be set to "${data.minValue}"`, () => {
        expect(rail.getAttribute('data-min-value')).toEqual(data.minValue.toString());
      });
      it(`The attribute "data-max-value" must be set to "${data.maxValue}"`, () => {
        expect(rail.getAttribute('data-max-value')).toEqual(data.maxValue.toString());
      });
      it(`The attribute "data-value-from" must be set to "${data.valueFrom}"`, () => {
        expect(rail.getAttribute('data-value-from')).toEqual(data.valueFrom.toString());
      });
      it(`The attribute "data-value-to" must be set to "${data.valueTo}"`, () => {
        expect(rail.getAttribute('data-value-to')).toEqual(data.valueTo.toString());
      });
      it(`The attribute "data-on-tooltip" must be set to "${data.isTooltip}"`, () => {
        expect(rail.getAttribute('data-on-tooltip')).toEqual(String(data.isTooltip));
      });
      it(`The attribute "data-on-range" must be set to "${data.isRange}"`, () => {
        expect(rail.getAttribute('data-on-range')).toEqual(String(data.isRange));
      });
      it(`The attribute "data-on-vertical" must be set to "${data.isVertical}"`, () => {
        expect(rail.getAttribute('data-on-vertical')).toEqual(String(data.isVertical));
      });
      it('Should switch to horizontal or vertical position', () => {
        if (data.isVertical) {
          expect(rail).toHaveClass(styles.locals.rail_ver);
        } else {
          expect(rail).not.toHaveClass(styles.locals.rail_ver);
        }
      });
      it('Should switch on/off thumbTo', () => {
        if (data.isRange) {
          expect(thumbTo.style.display).not.toEqual('none');
        } else {
          expect(thumbTo.style.display).toEqual('none');
        }
      });

      describe('Testing element "input-range-slider-view-progress"', () => {
        it('The attribute "class" must be set to "progress"', () => {
          expect(progress).toHaveClass(styles.locals.progress);
        });
        it(`The attribute "data-position-from" must be set to "${positionFrom}"`, () => {
          expect(progress.getAttribute('data-position-from')).toEqual(positionFrom.toString());
        });
        it(`The attribute "data-position-to" must be set to "${positionTo}"`, () => {
          expect(progress.getAttribute('data-position-to')).toEqual(positionTo.toString());
        });
        it(`The attribute "data-on-range" must be set to "${data.isRange}"`, () => {
          expect(progress.getAttribute('data-on-range')).toEqual(String(data.isRange));
        });
        it(`The attribute "data-on-vertical" must be set to "${data.isVertical}"`, () => {
          expect(progress.getAttribute('data-on-vertical')).toEqual(String(data.isVertical));
        });
        it('Should switch to horizontal or vertical position', () => {
          if (data.isVertical) {
            expect(progress).toHaveClass(styles.locals.progress_ver);
          } else {
            expect(progress).not.toHaveClass(styles.locals.rail_ver);
          }
        });
        it('Positions (top, right, bottom, lef) must be set ', () => {
          if (data.isVertical) {
            expect(Number(progress.style.top.slice(0, -1))).toBeCloseTo(positionFrom);
            if (data.isRange) {
              expect(Number(progress.style.bottom.slice(0, -1))).toBeCloseTo(100 - positionTo);
            } else {
              expect(progress.style.bottom).toEqual('0px');
            }
          } else {
            expect(Number(progress.style.left.slice(0, -1))).toBeCloseTo(positionFrom);
            if (data.isRange) {
              expect(Number(progress.style.right.slice(0, -1))).toBeCloseTo(100 - positionTo);
            } else {
              expect(progress.style.right).toEqual('0px');
            }
          }
        });
      });

      describe('Testing element "input-range-slider-view-thumb"', () => {
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
        it(`The attribute "data-value" must be set to valueFrom or valueTo (${data.valueFrom}/${data.valueTo})`, () => {
          expect(thumbFrom.getAttribute('data-value')).toEqual(data.valueFrom.toString());
          expect(thumbTo.getAttribute('data-value')).toEqual(data.valueTo.toString());
        });
        it(`The attribute "data-position" must be set to positionFrom or positionTo (${positionFrom}/${positionTo})`, () => {
          expect(thumbFrom.getAttribute('data-position')).toEqual(positionFrom.toString());
          expect(thumbTo.getAttribute('data-position')).toEqual(positionTo.toString());
        });
        it(`The attribute "data-on-vertical" must be set to "${data.isVertical}"`, () => {
          expect(thumbFrom.getAttribute('data-on-vertical')).toEqual(String(data.isVertical));
          expect(thumbTo.getAttribute('data-on-vertical')).toEqual(String(data.isVertical));
        });
        it(`The attribute "data-on-tooltip" must be set to "${data.isTooltip}"`, () => {
          expect(thumbFrom.getAttribute('data-on-tooltip')).toEqual(String(data.isTooltip));
          expect(thumbTo.getAttribute('data-on-tooltip')).toEqual(String(data.isTooltip));
        });
        it(`Must be set text content from tooltipFrom (${data.valueFrom}) or tooltipTo (${data.valueTo})`, () => {
          expect(tooltipFrom.textContent).toEqual(data.valueFrom.toFixed());
          expect(tooltipTo.textContent).toEqual(data.valueTo.toFixed());
        });
        it('Should be set left or top positions ', () => {
          if (data.isVertical) {
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
          if (data.isVertical) {
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
          if (data.isTooltip) {
            expect(tooltipFrom.style.display).toEqual('');
            expect(tooltipTo.style.display).toEqual('');
          } else {
            expect(tooltipFrom.style.display).toEqual('none');
            expect(tooltipTo.style.display).toEqual('none');
          }
        });
        it('On event "mouseup->mousemove" should dispatch event "range-slider-view" from thumbFrom', () => {
          let customEvent: CustomEvent | undefined;
          // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
          thumbFrom.addEventListener('slider-view', (evt: CustomEvent) => {
            customEvent = evt;
          });
          thumbFrom.dispatchEvent(new Event('mousedown'));
          document.dispatchEvent(new Event('mousemove'));
          expect(customEvent).toBeDefined();
        });
        it('On event "mouseup->mousemove" should dispatch event "range-slider-view" from thumbTo', () => {
          let customEvent: CustomEvent | undefined;
          // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
          thumbTo.addEventListener('slider-view', (evt: CustomEvent) => {
            customEvent = evt;
          });
          thumbTo.dispatchEvent(new Event('mousedown'));
          document.dispatchEvent(new Event('mousemove'));
          expect(customEvent).toBeDefined();
        });
      });
    });

    describe('Testing element "input-range-slider-view-scale"', () => {
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
      it(`The attribute "data-min-value" must be set to "${data.minValue}"`, () => {
        expect(scale.getAttribute('data-min-value')).toEqual(data.minValue.toString());
      });
      it(`The attribute "data-max-value" must be set to "${data.maxValue}"`, () => {
        expect(scale.getAttribute('data-max-value')).toEqual(data.maxValue.toString());
      });
      it(`The attribute "data-on-vertical" must be set to "${data.isVertical}"`, () => {
        expect(scale.getAttribute('data-on-vertical')).toEqual(String(data.isVertical));
      });
      it(`The attribute "data-on-range" must be set to "${data.isRange}"`, () => {
        expect(scale.getAttribute('data-on-range')).toEqual(String(data.isRange));
      });
      it(`The first element with class "scale_valuesItem" must have text content ${data.minValue}`, () => {
        expect(valuesItem[0].textContent).toEqual(data.minValue.toString());
      });
      it(`The last element with class "scale_valuesItem" must have text content ${data.maxValue}`, () => {
        expect(valuesItem[valuesItem.length - 1].textContent).toEqual(data.maxValue.toString());
      });
      it('On event "mousedown" should dispatch event "range-slider-view"', () => {
        let customEvent: CustomEvent | undefined;
        // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
        scale.addEventListener('slider-view', (evt: CustomEvent) => {
          customEvent = evt;
        });
        scale.dispatchEvent(new Event('mousedown'));
        expect(customEvent).toBeDefined();
      });

      describe('Vertical and horizontal switching tests', () => {
        it('The "scale_ver" class must be toggled for the "scale" element', () => {
          if (data.isVertical) {
            expect(scale).toHaveClass(styles.locals.scale_ver);
          } else {
            expect(scale).not.toHaveClass(styles.locals.scale_ver);
          }
        });
        it('The "wrapper_ver" class must be toggled for the "wrapper" element', () => {
          if (data.isVertical) {
            expect(wrapper).toHaveClass(styles.locals.scale__wrapper_ver);
          } else {
            expect(wrapper).not.toHaveClass(styles.locals.scale__wrapper_ver);
          }
        });
        it('The "scale__values_ver" class must be toggled for the "values" element', () => {
          if (data.isVertical) {
            expect(values).toHaveClass(styles.locals.scale__values_ver);
          } else {
            expect(values).not.toHaveClass(styles.locals.scale__values_ver);
          }
        });
        it('The "scale__valuesItem_ver" class must be toggled for the all "valuesItem" elements', () => {
          if (data.isVertical) {
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
          if (data.isVertical) {
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
          if (data.isVertical) {
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
