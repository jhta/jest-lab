# Tesing de componentes de React con Jest

ReactJS sé a convertido en una de las librerías más populares para crear las interfaces de usuario  de nuestras aplicaciones, éste trae un nuevo concepto que son los __componentes__. Debido a esto, los mismos creadores de Facebook vieron la necesidad de encontrar una herramienta para poder hacer tests efectivos de React, para esto crearon [Jest](https://facebook.github.io/jest/).

__Jest__ es una framework para Unit Testing basado en __Jasmine__ que como plus tiene las funcionalidades extra:

- Hace automaticamente  mocks de las dependencias CommonJS:
  puedes declarar modulos __require("modulo")__ en cualquier seccion de tus tests.
- Encuentra y ejecuta automaticamente los tests:
 al ejecutar el comando __Jest__ automaticamente buscara las carpetas \_\_tests\_\_  en tu proyecto y ejecutará los test que se encuentren ahi. (El nombre de la carpeta que buscará es configurable)
- Ejecuta los tests en una implementación falsa del DOM (usando JsDOM) para poder correr los tests desde la consola sin necesidad de correrlas en el navegador.

## Instalación

Para poder testear código __ES6__ debemos de tener instalado __Babel__ global

`npm i -g babel `

Instalamos el cliente de Jest para poder ejecutar los test desde la terminal

`npm i -g jest-cli`

Luego instalamos en local las dependencias necesarias para react y jest

`npm i -D babel-jest jest-cli react`

## Configuración
En el `package.json` debemos de configurar Jest de la siguiente manera:


```json
"jest": {
  "scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
  "testFileExtensions": [
    "es6",
    "js"
  ],
  "moduleFileExtensions": [
    "js",
    "json",
    "es6",
    "jsx"
  ],
  "unmockedModulePathPatterns": ["<rootDir>/node_modules/react"]
}
```
- __rootDir__: Es el folder por default donde jest buscará los tests y los modulos. Por defecto es la carpeta que contiene el package.json.
- __scriptPreprocessor__: definimos que pre-procesador va a ejecutar los tests, para nuestro caso utilizamos __babel-jest__ para poder interpretar ES6.
- __testFileExtensions__: definimos los tipos de archivos en los que pueden estar escritos los test.
- __moduleFileExtensions__: definimos los tipos de archivos que los tests pueden interpretar.

Puedes encontrar más opciones de configuración en su [API](https://facebook.github.io/jest/docs/api.html#config-bail-boolean).

## Jest en acción

El componente de ejemplo que vamos a testear será __TODO.jsx__. Verificaremos que su funcionamiento sea correcto.

```js
import React from 'react/addons';

const TODO = React.createClass({
  propType: {
    defaultText: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      defaultText: "task",
    };
  },
  getInitialState() {
    return {
      items: [],
      defaultText: this.props.defaultText,
    };
  },
  onKeyDown(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      const textItem = this.refs.item.getDOMNode().value.trim();
      const isEmpty = (textItem.length === 0);
      //this.refs.item.getDOMNode().value = '';
      const item = {
        text: textItem,
      };
      const {items} = this.state;
      if (!isEmpty) {
        items.push(item);
        this.setState({items});
      }
    }
  },
  onChange(e) {
    e.preventDefault();
    this.setState({
      defaultText: this.refs.item.getDOMNode().value.trim(),
    });
  },
  onDeleteItem(itemText) {
    const items = this.state.items.filter((item) => item.text != itemText);
    this.setState({items});
  },
  renderList() {
    return this.state.items.map((item, index) => {
      return (
        <li
          className="TODO-Item"
          key={index}>
          <span
            className="TODO-ItemDeleteIcon"
            onClick={() => {this.onDeleteItem(item.text)}}
            >
             x
          </span>
          {item.text}
        </li>);
    });
  },
  render() {
    const list = this.renderList();
    return (
        <div className="TODO">
          <form className="TODO-Form">
            <input
              type="text"
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              value={this.state.defaultText}
              ref="item"
            />
            <button type="button" onClick={this.onClick}> enviar</button>
          </form>
          <ul className="TODO-List">
            {list}
          </ul>
        </div>
    );
  },
});
export default TODO;

```

Los casos a testear serán:

 - El componente debe estar definido.
 - El input debe existir y estar definido como elemento del DOM.
 - Al presionar enter se debería de crear un item.
 - Al presionar click sobre el icono de borrado de un item este debería ser eliminado.
 - Si presíono enter para crear un item pero el input esta vacio no debería de crearme ningún elemento.
 - La cantidad de items debería de ser igual que la cantidad de items en el state.  


## Caso 1:
> El componente debe estar definido

Para poder simular los componentes necesitaremos usar la herramienta __TestUtils__ de react, la cual podremos usar al importar __'react/addons'__.
```js
import React from 'react/addons';
const {TestUtils} = React.addons;
```

TestUtils tiene el método __renderIntoDocument__, el que nos permitirá renderizar componentes y generar un DOM "falso" (con [JsDOM](https://github.com/tmpvar/jsdom)) a el cual le podemos pasar atributos(props).
```js
const TodoComponent = TestUtils.renderIntoDocument(<TODO defaultText="new task"/>);
```

TestUtils cuenta con diferentes métodos para definir el estado de un componente o un elemento del DOM:
 - __isCompositeComponent__: Recibe el elemento y retorna true si este es un componente de react.
 - __isDOMComponent__: Recibe el elementos y retorna true si este pertenece al DOM.
Puedes encontrar mas información en el [API](https://facebook.github.io/react/docs/test-utils.html) de TestUtils.

Escribiendo el test para este caso, se debería ver así:
```js
import React from 'react/addons';
const {TestUtils} = React.addons;

jest.dontMock('../TODO.jsx');

describe('TODO', () => {
  //definimos el componente a Testear
  const TODO = require('../TODO.jsx');
  const TodoComponent = TestUtils.renderIntoDocument(<TODO defaultText="new task"/>);
    //con TestUtils renderizamos un componente al cual le podemos pasar datos
  it("El componente debe estar definido", () => {
    expect(TestUtils.isCompositeComponent(TodoComponent)).toBeTruthy();
  });
});
```
Usamos __jest.dontMock('../TODO.jsx');__ por que Jest trata hace mock de cada componente, pero para este caso estamos usando el componente real.

## Caso 2:
> El input debe existir y estar definido como elemento del DOM.

Para poder encontrar elementos del DOM podemos usar los siguientes metodos de TestUtils:
 - __findRenderedDOMComponentWithTag__: Permite encontrar un elemento del DOM con el tag HTML que se envie (por ejemplo `<span>` o `<h1>`).
 - __scryRenderedDOMComponentsWithTag__: Es igual que __findRenderedDOMComponentsWithTag__ pero en este caso retorna un array con todos los elementos con este tag.  
 - __findRenderedDOMComponentWithClass__: Permite encontrar un elemento del DOM por su clase.
 - __scryRenderedDOMComponentsWithClass__: Es igual que __findRenderedDOMComponentsWithClass__ pero en este caso retorna un array con todos los elementos con esta clase.

 Ahora usaremos el método __findRenderedDOMComponentWithTag__ para encontrar el input, este caso de test se vería así:
 ```js
   it('El input debe existir y estar definido como elemento del DOM', () => {
     const input = TestUtils.findRenderedDOMComponentWithTag(TodoComponent, 'input');
     expect(TestUtils.isDOMComponent(input)).toBeTruthy();
   });
 ```   

## Caso 3:
> Al presionar enter se debería de crear un item.

ReactUtils tiene un método que nos será muy útil, __Simulate__.
__Simulate__ es un método que puede emular un evento javascript en nuestro componente a testear, sea click, keyDown, chagne, hover, etc.
Simulate recibe como parámetros el elemento del DOM al cual queramos ejercerle la acción y como opcional recibe el `eventData`.

Este caso se verḯa así:
```js
it('al enviar el formulario se deberia de crear un item', () => {
  //definimos los componentes del DOM
  const input = TestUtils.findRenderedDOMComponentWithTag(TodoComponent, 'input');
  //Simulamos cambio en el input
  TestUtils.Simulate.change(input);
  //Simulamos el keDown de la letra #13 de enter
  TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
  //al crear un item, deberia de renderizarse otro elemento de la lista, por ende,
  //aumentar el largo del array de este
  const items = TestUtils.scryRenderedDOMComponentsWithClass(TodoComponent, 'TODO-Item');
  //al crear una tarea, verificamos que el largo sea mayor que cero
  expect(items.length > 0).toBeTruthy();
});

```

## Caso 4:
> Al presionar click sobre el icono de borrado de un item este debería ser eliminado.

Ahora usaremos un evento click con Simulate, se debería de ver así:

```js
it('Al presionar click sobre el icono de borrado de un item este deberia ser eliminado', () => {
  const Todo = TestUtils.renderIntoDocument(<TODO defaultText="task"/>);
  const input = TestUtils.findRenderedDOMComponentWithTag(Todo, 'input');
  //Simulamos la creación de un item.
  TestUtils.Simulate.change(input);
  TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
  //buscamos todos los elementos con clase TODO-ItemDeleteIcon.
  const deleteIcons = TestUtils.scryRenderedDOMComponentsWithClass(Todo, 'TODO-ItemDeleteIcon');
  //como solo creamos uno, entonces  tomamos este y emulamos el evento click
  TestUtils.Simulate.click(deleteIcons[0]);
  //ahora traemos todos los items, no deberia de haber ninguno
  const items = TestUtils.scryRenderedDOMComponentsWithClass(Todo, 'TODO-Item');
  //como solo creamos uno y borramos uno, el array de items deberia tener de largo cero
  expect(items.length === 0).toBeTruthy();
});
```

## Caso 5:
> Si presiono enter para crear un item pero el input esta vacio no debería de crearme ningún elemento.

Para este caso verificamos que el largo de los items luego de haber intentado crear un item con el input vacio sea igual a cero.
```js
it('Si al enviar el formulario este esta vacio no deberia crear la tarea', () => {
  const Todo = TestUtils.renderIntoDocument(<TODO defaultText=""/>);
  const input = TestUtils.findRenderedDOMComponentWithTag(Todo, 'input');
  TestUtils.Simulate.change(input);
  //Simulamos el keDown de la letra #13 de enter
  TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
  const items = TestUtils.scryRenderedDOMComponentsWithClass(Todo, 'TODO-Item');
  //al crear una tarea, verificamos que el largo sea mayor que cero
  expect(items.length === 0).toBeTruthy();
});
```

## Caso 6:
> La cantidad de items debería de ser igual que la cantidad de items en el state.

Como `items` es un array en el `state` de nuestro componente, debemos verificar que cuando creemos algun item este cambie.

Al encontrar un componente con los distintos métodos de TestUtils, podemos acceder a este, a todos sus métodos y atributos. En este caso accederemos a su state.

```js
it('La cantidad de items deberia de ser igual que la cantidad de items en el state', () => {
  const input = TestUtils.findRenderedDOMComponentWithTag(TodoComponent, 'input');
  for (let i = 0; i < 10; i++) {
    TestUtils.Simulate.change(input);
    //Simulamos el keDown de la letra #13 de enter
    TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
  }
  const items = TestUtils.scryRenderedDOMComponentsWithClass(TodoComponent, 'TODO-Item');
  expect(TodoComponent.state.items.length === items.length).toBeTruthy();
});
```

Esto es sólo una pequeña parte de todo lo que podemos hacer con Jest y TestUtils, para aprender más ..........

**Código Fuente**: https://github.com/jhta/jest-lab
