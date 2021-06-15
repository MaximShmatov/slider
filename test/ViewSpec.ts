import '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle';
import '../src/components/RangeSlider/View';
import run from './TestData';

describe('TESTING MODULE SRC/SLIDER/VIEW.TS', () => {
  let view: HTMLElement;
  let spyCallback: jasmine.Spy;
  let spyEvents: jasmine.Spy;

  run((title: string, data: TPluginData) => {
    describe(title, () => {
      beforeAll(() => {
        view = document.createElement('range-slider');
        document.body.appendChild(view);
        spyCallback = jasmine.createSpy('spyCallback');
        spyEvents = jasmine.createSpy('spyEvents');
        view.addEventListener('range-slider', spyEvents);
        view.setCallback(spyCallback);

        view.setAttribute('data-min-value', String(data.minValue));
        view.setAttribute('data-max-value', String(data.maxValue));
        view.setAttribute('data-value-from', String(data.valueFrom));
        view.setAttribute('data-value-to', String(data.valueTo));
        view.setAttribute('data-step-size', String(data.stepSize));
        view.setAttribute('data-is-range', String(data.isRange));
        view.setAttribute('data-is-vertical', String(data.isVertical));
        view.setAttribute('data-has-scale', String(data.hasScale));
        view.setAttribute('data-has-tooltip', String(data.hasTooltip));
      });

      afterAll(() => {
        view.remove();
      });

      describe('Testing element "range-slider"', () => {
        let rangeSlider: HTMLElement;
        let slider: HTMLElement;
        let rail: HTMLElement;
        let scale: HTMLElement;
        let shadowRoot: ShadowRoot;

        beforeAll(() => {
          let element = document.body.querySelector<HTMLElement>('range-slider');
          if (element) {
            rangeSlider = element;
            if (rangeSlider.shadowRoot) shadowRoot = rangeSlider.shadowRoot;
            element = shadowRoot.querySelector('.slider');
            if (element) slider = element;
            element = shadowRoot.querySelector('.slider__rail');
            if (element) rail = element;
            element = shadowRoot.querySelector('.slider__scale');
            if (element) scale = element;
          }
        });
        afterAll(() => {
          rangeSlider.remove();
        });
        it('Should be mount element "range-slider" ', () => {
          expect(rangeSlider).toBe(view);
        });
        it('Should be mount element "ShadowRoot"', () => {
          expect(shadowRoot).toBeInstanceOf(ShadowRoot);
        });
        it('Should be mount element "div" (scale and rail wrapper)', () => {
          expect(slider).toBeInstanceOf(HTMLElement);
        });
        it('Should be mount element "range-slider-view-rail"', () => {
          expect(rail).toBeInstanceOf(HTMLElement);
        });
        it('Should be mount element "range-slider-view-scale"', () => {
          expect(scale).toBeInstanceOf(HTMLElement);
        });
        it('Should be mount element "style"', () => {
          expect(shadowRoot.querySelector('style')).toBeInstanceOf(HTMLElement);
        });

        it(`Should be set "data-min-value"="${data.minValue}" and dispatch event`, () => {
          expect(view.getAttribute('data-min-value')).toBe(String(data.minValue));
          const args = spyEvents.calls.allArgs()[0][0];
          expect(args.detail).toEqual({ name: 'data-min-value', value: String(data.minValue) });
        });
        it(`Should be set "data-max-value"="${data.maxValue}" and dispatch event`, () => {
          expect(view.getAttribute('data-max-value')).toBe(String(data.maxValue));
          const args = spyEvents.calls.allArgs()[1][0];
          expect(args.detail).toEqual({ name: 'data-max-value', value: String(data.maxValue) });
        });
        it(`Should be set "data-value-from"="${data.valueFrom}" and dispatch event`, () => {
          expect(view.getAttribute('data-value-from')).toBe(String(data.valueFrom));
          const args = spyEvents.calls.allArgs()[2][0];
          expect(args.detail).toEqual({ name: 'data-value-from', value: String(data.valueFrom) });
        });
        it(`Should be set "data-value-to"="${data.valueTo}" and dispatch event`, () => {
          expect(view.getAttribute('data-value-to')).toBe(String(data.valueTo));
          const args = spyEvents.calls.allArgs()[3][0];
          expect(args.detail).toEqual({ name: 'data-value-to', value: String(data.valueTo) });
        });
        it(`Should be set "data-step-size"="${data.stepSize}" and dispatch event`, () => {
          expect(view.getAttribute('data-step-size')).toBe(String(data.stepSize));
          const args = spyEvents.calls.allArgs()[4][0];
          expect(args.detail).toEqual({ name: 'data-step-size', value: String(data.stepSize) });
        });
        it(`Should be set "data-is-range"="${data.isRange}" and dispatch event`, () => {
          expect(view.getAttribute('data-is-range')).toBe(String(data.isRange));
          const args = spyEvents.calls.allArgs()[5][0];
          expect(args.detail).toEqual({ name: 'data-is-range', value: String(data.isRange) });
        });
        it(`Should be set "data-is-vertical"="${data.isVertical}" and dispatch event`, () => {
          expect(view.getAttribute('data-is-vertical')).toBe(String(data.isVertical));
          const args = spyEvents.calls.allArgs()[6][0];
          expect(args.detail).toEqual({ name: 'data-is-vertical', value: String(data.isVertical) });
        });
        it(`Should be set "data-has-scale"="${data.hasScale}" and dispatch event`, () => {
          expect(view.getAttribute('data-has-scale')).toBe(String(data.hasScale));
          const args = spyEvents.calls.allArgs()[7][0];
          expect(args.detail).toEqual({ name: 'data-has-scale', value: String(data.hasScale) });
        });
        it(`Should be set "data-has-tooltip"="${data.hasTooltip}" and dispatch event`, () => {
          expect(view.getAttribute('data-has-tooltip')).toBe(String(data.hasTooltip));
          const args = spyEvents.calls.allArgs()[8][0];
          expect(args.detail).toEqual({ name: 'data-has-tooltip', value: String(data.hasTooltip) });
        });

        it('Should switch (on/off) scale', () => {
          const display = (String(data.hasScale) === 'true') ? '' : 'none';
          expect(scale.style.display).toBe(display);
        });
        it('Should switch (horizontal/vertical) mode', () => {
          const className = (String(data.isVertical) === 'true') ? 'slider slider_vertical' : 'slider';
          expect(slider.className).toBe(className);
        });

        describe('Testing element "range-slider-rail"', () => {
          const min = Number(data.minValue);
          const max = Number(data.maxValue);
          const calcMove = (value: number) => Math.abs((value - min) / ((max - min) / 100));
          const moveFrom = calcMove(Number(data.valueFrom)).toFixed();
          const moveTo = calcMove(Number(data.valueTo)).toFixed();
          let thumbFrom: HTMLElement;
          let thumbTo: HTMLElement;
          let progress: HTMLElement;

          beforeAll(() => {
            [thumbFrom, thumbTo] = Array.from(rail.querySelectorAll('.slider__thumb'));
            const element = rail.querySelector('.slider__progress');
            if (element instanceof HTMLElement) progress = element;
          });
          it('Should be mount element "range-slider-progress"', () => {
            expect(progress).toBeInstanceOf(HTMLElement);
          });
          it('Should be mount "range-slider-thumb" (thumb from)', () => {
            expect(thumbFrom).toBeInstanceOf(HTMLElement);
          });
          it('Should be mount "range-slider-thumb" (thumb to)', () => {
            expect(thumbTo).toBeInstanceOf(HTMLElement);
          });

          it(`The attribute "data-value-from" must be set to "${data.valueFrom}"`, () => {
            expect(rail.getAttribute('data-value-from')).toBe(String(data.valueFrom));
          });
          it(`The attribute "data-value-to" must be set to "${String(data.valueTo)}"`, () => {
            expect(rail.getAttribute('data-value-to')).toBe(String(data.valueTo));
          });
          it(`The attribute "data-move-from" must be set to "${moveFrom}"`, () => {
            expect(progress.getAttribute('data-move-from')).toBe(moveFrom);
          });
          it(`The attribute "data-move-to" must be set to "${moveTo}"`, () => {
            expect(progress.getAttribute('data-move-to')).toBe(moveTo);
          });
          it(`The attribute "data-has-tooltip" must be set to "${data.hasTooltip}"`, () => {
            expect(rail.getAttribute('data-has-tooltip')).toBe(String(data.hasTooltip));
          });
          it(`The attribute "data-is-range" must be set to "${data.isRange}"`, () => {
            expect(rail.getAttribute('data-is-range')).toBe(String(data.isRange));
          });
          it(`The attribute "data-is-vertical" must be set to "${data.isVertical}"`, () => {
            expect(rail.getAttribute('data-is-vertical')).toBe(String(data.isVertical));
          });
          it('Should switch (on/off) thumbTo', () => {
            const display = (String(data.isRange) === 'true') ? '' : 'none';
            expect(thumbTo.style.display).toBe(display);
          });

          it('On event "mousedown" should run callback', () => {
            spyCallback.calls.reset();
            rail.dispatchEvent(new Event('mousedown'));
            expect(spyCallback).toHaveBeenCalled();
          });
          it('On event "mousedown->mousemove" should run callback twice', () => {
            spyCallback.calls.reset();
            rail.dispatchEvent(new Event('mousedown'));
            document.dispatchEvent(new Event('mousemove'));
            expect(spyCallback.calls.count()).toBe(2);
          });

          describe('Testing element "range-slider-progress"', () => {
            it(`The attribute "data-move-from" must be set to "${moveFrom}"`, () => {
              expect(progress.getAttribute('data-move-from')).toBe(moveFrom);
            });
            it(`The attribute "data-move-to" must be set to "${moveTo}"`, () => {
              expect(progress.getAttribute('data-move-to')).toBe(moveTo);
            });
            it(`The attribute "data-is-range" must be set to "${data.isRange}"`, () => {
              expect(progress.getAttribute('data-is-range')).toBe(String(data.isRange));
            });
            it(`The attribute "data-is-vertical" must be set to "${data.isVertical}"`, () => {
              expect(progress.getAttribute('data-is-vertical')).toBe(String(data.isVertical));
            });

            it('Must be set positions (top, right, bottom, lef)', () => {
              const top = progress.style.top.slice(0, -1);
              const left = progress.style.left.slice(0, -1);
              const right = progress.style.right.slice(0, -1);
              const bottom = progress.style.bottom.slice(0, -1);

              const isVertical = (String(data.isVertical) === 'true');
              const isRange = (String(data.isRange) === 'true');
              const progressTo = 100 - (isRange ? Number(moveTo) : Number(moveFrom));
              let rightOrBottom = isVertical ? bottom : right;
              let leftOrTop = isVertical ? top : left;
              rightOrBottom = (rightOrBottom === '') ? '-Infinity' : rightOrBottom;
              leftOrTop = (leftOrTop === '') ? 'Infinity' : leftOrTop;
              expect(String(progressTo)).toBe(rightOrBottom);
              expect(isRange ? moveFrom : '0').toBe(leftOrTop);
            });
          });

          describe('Testing elements "range-slider-thumb" (from and to)', () => {
            let tooltipFrom: HTMLElement;
            let tooltipTo: HTMLElement;
            beforeAll(() => {
              let element: HTMLElement | null;
              element = thumbFrom.querySelector('.slider__thumb-tooltip');
              if (element) tooltipFrom = element;
              element = thumbTo.querySelector('.slider__thumb-tooltip');
              if (element) tooltipTo = element;
            });
            it('Should be mount elements "tooltip" (from and to)', () => {
              expect(tooltipFrom).toBeInstanceOf(HTMLElement);
              expect(tooltipTo).toBeInstanceOf(HTMLElement);
            });
            it(`The attribute "data-value" must be set to (${data.valueFrom} and ${data.valueTo})`, () => {
              expect(thumbFrom.getAttribute('data-value')).toBe(String(data.valueFrom));
              expect(thumbTo.getAttribute('data-value')).toBe(String(data.valueTo));
            });
            it(`The attribute "data-move" must be set to (${moveFrom} and ${moveTo})`, () => {
              expect(thumbFrom.getAttribute('data-move')).toBe(moveFrom);
              expect(thumbTo.getAttribute('data-move')).toBe(moveTo);
            });
            it(`The attribute "data-is-vertical" must be set to "${data.isVertical}"`, () => {
              expect(thumbFrom.getAttribute('data-is-vertical')).toBe(String(data.isVertical));
              expect(thumbTo.getAttribute('data-is-vertical')).toBe(String(data.isVertical));
            });
            it(`The attribute "data-has-tooltip" must be set to "${data.hasTooltip}"`, () => {
              expect(thumbFrom.getAttribute('data-has-tooltip')).toBe(String(data.hasTooltip));
              expect(thumbTo.getAttribute('data-has-tooltip')).toBe(String(data.hasTooltip));
            });
            it(`Must be set text content (${data.valueFrom} and ${data.valueTo})`, () => {
              expect(tooltipFrom.textContent).toBe(String(data.valueFrom));
              expect(tooltipTo.textContent).toBe(String(data.valueTo));
            });
            it('Should be set positions (left, top)', () => {
              const isVertical = (String(data.isVertical) === 'true');
              const topFrom = thumbFrom.style.top.slice(0, -1);
              const topTo = thumbTo.style.top.slice(0, -1);
              const leftFrom = thumbFrom.style.left.slice(0, -1);
              const leftTo = thumbTo.style.left.slice(0, -1);
              let leftOrTopFrom = isVertical ? topFrom : leftFrom;
              let leftOrTopTo = isVertical ? topTo : leftTo;
              leftOrTopFrom = (leftOrTopFrom === '') ? 'Infinity' : leftOrTopFrom;
              leftOrTopTo = (leftOrTopTo === '') ? 'Infinity' : leftOrTopTo;
              expect(leftOrTopFrom).toBe(moveFrom);
              expect(leftOrTopTo).toBe(moveTo);
            });
            it('Should switch (on/off) tooltip', () => {
              if (String(data.hasTooltip) === 'true') {
                expect(tooltipFrom.style.display).toBe('');
                expect(tooltipTo.style.display).toBe('');
              } else {
                expect(tooltipFrom.style.display).toBe('none');
                expect(tooltipTo.style.display).toBe('none');
              }
            });
          });
        });

        describe('Testing element "range-slider-scale"', () => {
          let values: HTMLElement;
          let valuesItem: NodeListOf<HTMLElement>;
          let wrapper: HTMLElement;
          let division: NodeListOf<HTMLElement>;
          let subdivision: NodeListOf<HTMLElement>;
          beforeAll(() => {
            let element: HTMLElement | null;
            element = scale.querySelector('.slider__scale-values');
            if (element) values = element;
            element = scale.querySelector('.slider__scale-wrapper');
            if (element) wrapper = element;
            valuesItem = scale.querySelectorAll('.slider__scale-values-item');
            division = scale.querySelectorAll('.slider__scale-division');
            subdivision = scale.querySelectorAll('.slider__scale-subdivision');
          });
          it('Must include four elements with class "slider__scale-valuesItem"', () => {
            expect(valuesItem.length).toBe(4);
          });
          it('Must include element with class "slider__scale-wrapper"', () => {
            expect(wrapper).toBeInstanceOf(HTMLElement);
          });
          it('Must include element with class "slider__scale-values"', () => {
            expect(values).toBeInstanceOf(HTMLElement);
          });
          it('Must include three elements with class "slider__scale-division"', () => {
            expect(division.length).toBe(3);
          });
          it('Must include 15 elements with class "slider__scale-subdivision"', () => {
            expect(subdivision.length).toBe(15);
          });
          it(`The attribute "data-min-value" must be set to "${data.minValue}"`, () => {
            expect(scale.getAttribute('data-min-value')).toBe(String(data.minValue));
          });
          it(`The attribute "data-max-value" must be set to "${data.maxValue}"`, () => {
            expect(scale.getAttribute('data-max-value')).toBe(String(data.maxValue));
          });
          it(`The attribute "data-is-vertical" must be set to "${data.isVertical}"`, () => {
            expect(scale.getAttribute('data-is-vertical')).toBe(String(data.isVertical));
          });
          it(`The attribute "data-is-range" must be set to "${data.isRange}"`, () => {
            expect(scale.getAttribute('data-is-range')).toBe(String(data.isRange));
          });
          it(`The first element item value must have text content ${data.minValue}`, () => {
            expect(Number(valuesItem[0].textContent)).toBe(Number(data.minValue));
          });
          it(`The last element item value must have text content ${data.maxValue}`, () => {
            const value = Number(valuesItem[valuesItem.length - 1].textContent);
            expect(value).toBe(Number(data.maxValue));
          });

          it('On event "mousedown" should run callback function', () => {
            spyCallback.calls.reset();
            scale.dispatchEvent(new Event('mousedown'));
            expect(spyCallback).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
