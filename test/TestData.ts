const ITERATION_COUNT = 13;

function run(runTests: TRunFunc): void {
  const getNumRandom = (val: number) => {
    const newValue = (Math.round(Math.random()) ? (-1 * val) : val);
    return (newValue * Math.random()).toFixed();
  };
  const getBoolRandom = () => String(Math.round(Math.random()) === 1);
  const getTestData = () => ({
    minValue: getNumRandom(100),
    maxValue: getNumRandom(100),
    valueTo: getNumRandom(100),
    valueFrom: getNumRandom(100),
    stepSize: getNumRandom(10),
    isRange: getBoolRandom(),
    isVertical: getBoolRandom(),
    hasScale: getBoolRandom(),
    hasTooltip: getBoolRandom(),
  });

  for (let i = 1; i <= ITERATION_COUNT; i += 1) {
    const data = getTestData();
    const title = `RUN TEST PART - ${i}: ${JSON.stringify(data)}`;
    runTests(title, data);
  }
}

export default run;
