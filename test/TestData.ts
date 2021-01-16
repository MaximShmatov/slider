function getRandom(num: number) {
  let number = num;
  if (Math.round(Math.random())) {
    number *= -1;
  }
  return Math.round(Math.random() * number);
}

const object = {
  minValue: getRandom(100),
  maxValue: getRandom(100),
  valueFrom: getRandom(100),
  valueTo: getRandom(100),
  stepSize: getRandom(10),
  isVertical: (Math.round(Math.random()) === 1),
  isRange: (Math.round(Math.random()) === 1),
  hasTooltip: (Math.round(Math.random()) === 1),
  hasScale: (Math.round(Math.random()) === 1),
};

function getHTMLElement(): HTMLElement {
  const element = document.createElement('div');
  element.className = 'js-test-element';
  element.setAttribute('data-min-value', object.minValue.toString());
  element.setAttribute('data-max-value', object.maxValue.toString());
  element.setAttribute('data-value-from', object.valueFrom.toString());
  element.setAttribute('data-value-to', object.valueTo.toString());
  element.setAttribute('data-step-size', object.stepSize.toString());
  element.setAttribute('data-is-range', object.isRange.toString());
  element.setAttribute('data-has-scale', object.hasScale.toString());
  element.setAttribute('data-is-vertical', object.isVertical.toString());
  element.setAttribute('data-has-tooltip', object.hasTooltip.toString());
  return element;
}

export { getHTMLElement, object };
