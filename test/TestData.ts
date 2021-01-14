function getRandom(num: number) {
  let number = num;
  if (Math.round(Math.random())) {
    number *= -1;
  }
  return Math.round(Math.random() * number);
}

const data: ISliderData = {
  minValue: getRandom(100),
  maxValue: getRandom(100),
  valueFrom: getRandom(100),
  valueTo: getRandom(100),
  stepSize: getRandom(10),
  isVertical: Math.round(Math.random()) === 1,
  isRange: Math.round(Math.random()) === 1,
  hasTooltip: Math.round(Math.random()) === 1,
  hasScale: Math.round(Math.random()) === 1,
};

function getHTMLElement(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'js-test-element';
  element.setAttribute('data-min-value', data.minValue.toString());
  element.setAttribute('data-max-value', data.maxValue.toString());
  element.setAttribute('data-value-from', data.valueFrom.toString());
  element.setAttribute('data-value-to', data.valueTo.toString());
  element.setAttribute('data-step-size', data.stepSize.toString());
  element.setAttribute('data-is-range', data.isRange.toString());
  element.setAttribute('data-has-scale', data.hasScale.toString());
  element.setAttribute('data-is-vertical', data.isVertical.toString());
  element.setAttribute('data-has-tooltip', data.hasTooltip.toString());
  return element;
}

export { getHTMLElement, data };
