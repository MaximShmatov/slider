const ITERATION_COUNT = 3;

function run(runTests: TRunFunc): void {
  const data: TPluginData[] = [{
    minValue: 100,
    maxValue: 100,
    valueTo: 50,
    valueFrom: -50,
    stepSize: 5,
    isRange: true,
    isVertical: true,
    hasScale: false,
    hasTooltip: false,
  },
  {
    minValue: 10,
    maxValue: 87,
    valueTo: 54,
    valueFrom: -5,
    stepSize: 15,
    isRange: false,
    isVertical: true,
    hasScale: false,
    hasTooltip: true,
  },
  {
    minValue: 1,
    maxValue: -100,
    valueTo: 14,
    valueFrom: 17,
    stepSize: 9,
    isRange: true,
    isVertical: false,
    hasScale: true,
    hasTooltip: false,
  }];

  for (let i = 1; i <= ITERATION_COUNT; i += 1) {
    const title = `RUN TEST PART - ${i}`;
    runTests(title, data[i - 1]);
  }
}

export default run;
