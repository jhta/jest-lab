# Tesing de componentes de React con Jest

ReactJS se a convertido en una de las librerias mas populares actualmente para crear el frontend de nuestras aplicaciones, este trae un nuevo concepto que son los __componentes__. Debido a esto, los mismos creadores de Facebook vieron la necesidad de crear una herramienta para poder hacer tests efectivos de React, esta es [Jest](https://facebook.github.io/jest/).

__Jest__ es una framework para Unit Testing basado en __Jasmine__ que como plus tiene las funcionalidades extra:

- Hace automaticamente  mocks de las dependencias CommonJS:
  puedes declarar modulos __require("modulo")__ en cualquier seccion de tus tests.
- Encuentra y ejecuta automaticamente los tests:
 al ejecutar el comando __Jest__ automaticamente buscara las carpetas ____ tests __ __  en tu proyecto y ejecutará los test que se encuentren ahi. (El nombre de las carpetas que buscará es configurable)
- Ejecuta los tests en una implementación falsa del DOM (usando JsDOM) para poder correr los tests desde la consola.

## Instalación

Para poder testear codigo __ES6__ debemos de tener instalado __Babel__ global

`npm i -g babel `

Instalamos el cliente de Jest para poder ejecutar los test desde la terminal

`npm i -g jest-cli`

Luego instalamos en local las dependencias necesarias para react y jest

`npm i -D babel-jest jest-cli react`

## Configuración
En el package.json debemos de configurar Jest de la siguiente manera:


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

Puedes encontrar mas opciones de configuración en su [API](https://facebook.github.io/jest/docs/api.html#config-bail-boolean).

## Nuestro Primer Test

Para poder interpretar los componentes, podremos usar __TestUtils__ de React, con esta podremos buscar componentes, clases y tags en componentes, simular eventos, entre otras funcionalidades propias de estos.

El Objetivo de nuestro primer test es verificar si el componente fue creado:

TODO.jsx
```js
import React from 'react/addons';
const TODO = React.createClass({
  render() {
    return (
      <div>
        Hola Mundo!
      </div>
    );
  }
});
export default TODO;
```
TODO-test.js
```js
import React from 'react/addons';
const {TestUtils} = React.addons;
jest.dontMock('../TODO');
describe('Primer Test', () => {
  //definimos el componente a Testear
  const TODO = require('../TODO');
  //con TestUtils renderizamos un componente al cual le podemos pasar datos
  const TodoComponent = TestUtils.renderIntoDocument(<TODO/>);
  it("El componente debe estar definido", () => {
    expect(TodoComponent).toBeDefined();
  });
});
```
