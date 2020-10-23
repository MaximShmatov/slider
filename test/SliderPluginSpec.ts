import '../src/slider/SliderPlugin';
import { getHTMLElement, data } from './TestData';

describe('TESTING MODULE SRC/SLIDER/SLIDERPLUGIN.TS', () => {
  const props = <TMethodsUnion[]>Object.keys(data);
  let $obj: JQuery;

  describe('Plugin initialization testing', () => {
    let block: HTMLElement;
    beforeEach(() => {
      block = document.createElement('div');
      block.appendChild(getHTMLElement());
      block.appendChild(getHTMLElement());
      block.appendChild(getHTMLElement());
      document.body.appendChild(block);
    });
    afterEach(() => {
      block.remove();
    });
    it('Plugin should initialize elements and return new "jQuery" object with initialized elements', () => {
      $obj = $('.js-test-element').slider('init');
      expect($obj).toBeInstanceOf($);
      expect($obj.length).toEqual(3);
      expect($obj[0]).toBeInstanceOf(HTMLElement);
      expect($obj[1]).toBeInstanceOf(HTMLElement);
      expect($obj[2]).toBeInstanceOf(HTMLElement);
    });
    it('Plugin should find initialized elements and return them', () => {
      // eslint-disable-next-line fsd/jq-cache-dom-elements
      $('.js-test-element').first().slider('init');
      $obj = $('.js-test-element').slider();
      expect($obj).toBeInstanceOf($);
      expect($obj.length).toEqual(1);
      expect($obj[0]).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Testing getters API', () => {
    let element: ISliderView;
    let spyGetProps: jasmine.Spy;
    beforeAll(() => {
      document.body.appendChild(getHTMLElement());
      $obj = $('.js-test-element').slider('init');
      element = <ISliderView>$obj[0];
      if (element.presenter) {
        spyGetProps = spyOn(element.presenter, 'getProps').and.callThrough();
      }
    });
    afterAll(() => {
      element.remove();
    });
    props.forEach((key) => {
      it(`Method $("element").slider("${key}") should call "presenter.getProps("${key}")"`, () => {
        $obj.slider(key);
        expect(spyGetProps).toHaveBeenCalledWith(key);
      });
    });
  });

  describe('Testing setters API', () => {
    let element: ISliderView;
    let spySetProps: jasmine.Spy;
    beforeAll(() => {
      document.body.appendChild(getHTMLElement());
      $obj = $('.js-test-element').slider('init');
      element = <ISliderView>$obj[0];
      if (element.presenter) {
        spySetProps = spyOn(element.presenter, 'setProps').and.callThrough();
      }
    });
    afterAll(() => {
      element.remove();
    });
    props.forEach((key) => {
      it(`Method $("element").slider("${key}") should call "presenter.getProps("${key}")"`, () => {
        $obj.slider(key, data[key]);
        expect(spySetProps).toHaveBeenCalledWith(key, data[key]);
      });
    });
  });
});
