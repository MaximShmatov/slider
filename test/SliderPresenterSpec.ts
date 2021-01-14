import Presenter from '../src/components/RangeSlider/Presenter';

function getHTMLElementFromObj(): HTMLElement {
  const element = document.createElement('input');
  element.setAttribute('data-min-value', '5');
  element.setAttribute('data-max-value', '95');
  element.setAttribute('data-value-from', '15');
  element.setAttribute('data-value-to', '85');
  element.setAttribute('data-step-size', '5');
  element.setAttribute('data-is-range', 'false');
  element.setAttribute('data-has-scale', 'false');
  element.setAttribute('data-is-vertical', 'false');
  element.setAttribute('data-has-tooltip', 'false');
  return element;
}

describe('TESTING MODULE SRC/SLIDER/SLIDERPRESENTER.TS', () => {
  const presenter = new Presenter();
  const modelData = {
    isVertical: true,
    hasScale: true,
    isRange: true,
    hasTooltip: true,
    minValue: 0,
    maxValue: 100,
    valueFrom: 10,
    valueTo: 90,
    stepSize: 1,
  };
  const props = <TMethodsUnion[]>Object.keys(modelData);

  it('View.ts should be defined', () => {
    expect(presenter.view).toBeDefined();
  });

  describe('Testing reading properties', () => {
    const element = getHTMLElementFromObj();

    beforeAll(() => {
      presenter.init(element);
    });
    props.forEach((key) => {
      it(`getProps("${key}") should return ${element.dataset[key]}`, () => {
        expect(String(presenter.getProps(key))).toEqual(String(element.dataset[key]));
      });
    });
  });

  describe('Testing setting properties', () => {
    let spySetModelData: jasmine.Spy;
    const dataModelEvt: { name: string, value: number | boolean | string }[] = [];
    const spyModelEvt = jasmine.createSpy('spyModelEvt').and.callFake((evt) => {
      dataModelEvt.push(evt.detail);
    });

    beforeAll(() => {
      spySetModelData = spyOn(presenter.view, 'setModelData');
      presenter.view.addEventListener('slider-data', spyModelEvt);
    });
    afterEach(() => {
      spyModelEvt.calls.reset();
      spySetModelData.calls.reset();
      dataModelEvt.length = 0;
    });
    props.forEach((key) => {
      it(`setProps("${key}") should dispatch event "slider-model" and call method "setModelData" with (${key}, ${modelData[key]})`, () => {
        presenter.setProps(key, modelData[key]);
        if (key === 'valueTo' && presenter.getProps('isRange') === false) {
          expect(spyModelEvt).not.toHaveBeenCalled();
        } else {
          expect(spyModelEvt).toHaveBeenCalled();
          expect(dataModelEvt[0].name).toEqual(key);
          expect(dataModelEvt[0].value).toEqual(modelData[key]);
          expect(spySetModelData).toHaveBeenCalledWith(key, modelData[key]);
        }
      });
    });
  });

  describe('Testing handle events "range-slider-view"', () => {
    let spySetProps: jasmine.Spy;
    let dataViewEvt: CustomEvent;
    const spyViewEvt = jasmine.createSpy('spyViewEvt').and.callFake((evt) => {
      dataViewEvt = evt;
    });
    let thumbs: NodeListOf<HTMLElement>;

    beforeAll(() => {
      if (presenter.view.shadowRoot) {
        thumbs = presenter.view.shadowRoot.querySelectorAll('input-slider-view-thumb');
      }
      spySetProps = spyOn(presenter, 'setProps');
      presenter.view.addEventListener('slider-view', spyViewEvt);
    });
    afterEach(() => {
      spyViewEvt.calls.reset();
      spySetProps.calls.reset();
    });
    it('Events "mousedown (from)"->"mousemove" should dispatch event "range-slider-view" and call method "setProps" with (valueFrom)', () => {
      thumbs[0].dispatchEvent(new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove'));
      expect(spyViewEvt).toHaveBeenCalled();
      expect(dataViewEvt.detail.name).toEqual('valueFrom');
      expect(spySetProps).toHaveBeenCalledWith('valueFrom', jasmine.anything());
    });
    it('Events "mousedown (to)"->"mousemove" should dispatch event "range-slider-view" and call method "setProps with (valueTo)"', () => {
      thumbs[1].dispatchEvent(new MouseEvent('mousedown'));
      document.dispatchEvent(new MouseEvent('mousemove'));
      expect(spyViewEvt).toHaveBeenCalled();
      expect(dataViewEvt.detail.name).toEqual('valueTo');
      expect(spySetProps).toHaveBeenCalledWith('valueTo', jasmine.anything());
    });
  });
});
