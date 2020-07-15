import './index.sass';
import {ISliderModel} from "./slider/ISliderModel";

async function getConfigSlider(): Promise<ISliderModel | null> {
  let form: FormData = new FormData();
  form.set('variant', '0');
  try {
    let response: Response = await fetch('http://localhost:9000/slider', {method: 'POST', body: form});
    return await response.json();
  } catch (err) {
    console.log(err);
  }
  return null;

}

console.log('1 result');
getConfigSlider().then(result => console.log('2 result', result));
console.log('3 result');