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
  isTooltip: Math.round(Math.random()) === 1,
  isScale: Math.round(Math.random()) === 1,
  serverURL: 'http://localhost:9000/slider',
};

function getHTMLElement(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'js-test-element';
  element.setAttribute('data-min-value', data.minValue.toString());
  element.setAttribute('data-max-value', data.maxValue.toString());
  element.setAttribute('data-value-from', data.valueFrom.toString());
  element.setAttribute('data-value-to', data.valueTo.toString());
  element.setAttribute('data-step-size', data.stepSize.toString());
  element.setAttribute('data-on-range', data.isRange.toString());
  element.setAttribute('data-on-scale', data.isScale.toString());
  element.setAttribute('data-on-vertical', data.isVertical.toString());
  element.setAttribute('data-on-tooltip', data.isTooltip.toString());
  element.setAttribute('data-server-u-r-l', data.serverURL.toString());
  return element;
}

export { getHTMLElement, data };
