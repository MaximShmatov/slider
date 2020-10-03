Плагин слайдера для jQuery
========
Обзор ([демонстрационная страница плагина](dist/index.html))
--------
Это специальный контрол для библиотеки javascript jQuery, 
который позволяет перетягиванием задавать какое-то целое числовое значение. 
Он был протестирован в Internet Explorer 11, Opera 70 и Chrome 85. Возможности плагина:
1. Плагин имеет удобное API для подключения его к элементам на странице. 
Подключение происходит за счет замены искомого HTML элемента.
2. Плагин может быть инициализирован: 
    * из JS-объекта;
    * из HTML-элемента;
    * с сервера посредством REST.
3. Плагин позволяет из JS-скрипта в режиме реального времени задавать следующие настройки:
    * минимальное и максимальное значение;
    * размер шага;
    * вид (вертикальный или горизонтальный);
    * одиночное значение или интервал;
    * включать и отключать показ текущего значения над бегунком;
    * включать и отключать шкалу допустимых значений.
4. Стили плагина вынесены в отдельный файл, и это позволяет менять его дизайн и оформление.
### Зависимости    
* jquery-3.5.1
### Подключение
```html
<script type="text/javascript" src="slider/SliderPlugin.js"></script>
```
или
```javascript
import 'slider/SliderPlugin.js';
```
### Инициализация
```haml
<div id="slider" data-min-value="-10" data-max-value="100" data-value-from="0" data-step-size="1"></div>
```
```javascript
jQuery('#slider').slider('init');
```
или
```javascript
jQuery('#slider').slider('init', {
    minValue:-10,
    maxValue: 100,
    valueFrom: 0,
    valueTo: 10,
    stepSize: 1,
    onRange: true,
    onVertical: true,
    onTooltip: true,
    onScale: true,
    serverURL: 'http://server/slider'
});
```
или
```javascript
obj = new FormData();
obj.set('uri', 'http://server/slider');
jQuery('#slider').slider('init', obj);
```
### Установа / получение свойств
```javascript
$obj = jQuery('#slider').slider('init');
$obj.slider('minValue', '10');
let minValue = $obj.slider('minValue');
```
--------------
Архитектура
--------------
Плагин реализован на языке TypeScript с применением шаблона проектирования MVP.  
Тесты к плагину прилагаются, и используют фреймворки Jasmine и Karma. 
Команда запуска тестов `npm run test`.
Плагин состоит из шести файлов:
* SliderModel.ts - содержит класс модели с логикой валидации свойств; 
* SliderView.ts - содержит классы пользовательских веб-компонентов;
* SliderPresenter.ts - контроллер или презентер,
 реализует API плагина (инициализация, установка и чтение опций), а также расчитывает значение бегунка;
* SliderPlugin.ts - собственно сам плагин. Присоединяет функцию "Slider" к jQuery объекту;
* slider.module.sass - стили плагина. Также сожержат модификаторы для вертикального состояния;
* slider.d.ts - файл деклараций. Содержит интерфейсы и определения типов;
### SliderModel.ts
Файл содержит в себе реализацию "Model" шаблона проектирования MVP.
Класс модели содержит в себе свойства и состояния плагина, а также методы инициализации. 
При создании объекта в конструктор передается функция, 
которая вызывается в случае изменения значения свойства.
Для инициализации плагина модель может принимать объект (HTMLElement | FormData | ISliderData). 
При установке свойства, сетеры проверяют переданное им значение на корректнось 
(установа значения проходит валидацию). Объект модели представлен следующими свойствами:
* _minValue: number - минимальное значение;
* _maxValue: number - максимальное значение;
* _valueFrom: number - текущее значение (если "onRange = true", то начальное значение);
* _valueTo: number - если "onRange = true", то конечное значение, иначе игнорируется;
* _stepSize: number - размер шага. Размер шага не может быть меньше единицы;
* _onRange: boolean - вкл/выкл диапазона слайдера;
* _onTooltip: boolean - вкл/выкл табло значения над бегунком;
* _onScale: boolean - вкл/выкл шкалу слайдера;
* _onVertical: boolean - вкл/выкл вертикальное состояние;
* _serverURL: string - адрес сервера в случае инициализации по сети;
* _observer: function - функция обратного вызова;
### SliderView.ts
Файл содержит в себе реализацию "View" шаблона проектирования MVP, и содержит в себе пять классов веб-компонентов.
В случае изменения значения слайдера пользователем посредством перетаскивания бегунка,
генерирует событие "slider-view". Событие содержит в себе объект: "{name: string, value: number}".
В образовательных целях вид слайдера реализован посредством веб-компонентов и разбит на "subView".
Для поддержки браузерами веб-компонентов к "View" были подключены 
[полифилы](https://www.webcomponents.org/polyfills). Файл стилей импортируется как модуль.
Это исключает конфликт имен классов в случае, если на странице странице подключено несколько слайдеров.
"View" реализован посредством следующих классов:
* SliderView - агрегирует все кастомные элементы и встраивает их в ShadowRoot;
* Scale - представляет собой шкалу слайдера;
* Rail - реализует рельс по которому двигается ползунок;
* Progress - визуально выделяет текущее значение слайдера;
* Thumb - собственно, сам ползунок.
### SliderPresenter.ts
Файл содержит в себе реализацию "Presenter" шаблона проектирования MVP. 
Презентер является связующим звеном между моделью и представлением. Устанавливает или читает свойства 
модели и затем обновляет вид.

**Сздание объекта класа "SliderPresenter" происходит в следующем порядке:**
1. Создает объект модели и передает в неё функцию обратного вызова.
2. Создает пользовательский элемент "input-slider" и помещает в него ссылку на себя.
3. На созданный объект "view" устанавливает прослушку события "slider-view".

**Установка свойств слайдера или его инициализация происходит в следующем порядке:**
1. Вызывается метод установки свойства или инициализации модели.
2. Если значение свойства модели изменилось, вызывается функция презентера "observer".
3. Функция "observer" вызывает метод представления для установки нового значения атрибутов.
4. Функция "observer" генерирует событие "slider-data" для оповещения внешнего кода об изменениях.

**Реакция презентера на действия пользователя происходит в следующем порядке:**
1. Презентер слушает событие "slider-view" на представлении.
2. Извлекает из объекта события координаты бегунка и расчитывает значение слайдера.
3. Устанавливает в свойство модели расчитанное значение.
4. Генерирует событие "slider-data" для оповещения внешнего кода об изменениях.
### SliderPlugin.ts
Файл содержит в себе код расщирения jQuery объекта перегруженой функцией "slider". 
Функция имеет следующие реализации:
* `slider(method: 'init'): JQuery` - возвращает jQuery объект с инициализированными элементами;
* `slider(method: TMethodsUnion): number | boolean | string` - возвращает значение свойства плагина;
* `slider(method: TMethodsUnion, prop: number | boolean | string): void` - устанавливает свойство плагина;
* `slider(): JQuery` - возвращает jQuery объект с ранее инициализированными элементами;
* `slider(method: 'init', prop: HTMLElement | ISliderData | FormData): JQuery` - инициализирует элементы 
из заданного объекта;

--------------
UML-диаграмма классов
--------------
![UML-диаграмма классов](diagram.png "UML-диаграмма классов")