# tesing de componentes de React con Jest

__Jest__ es una framework para Unit Testing creado por Facebook, basado en __Jasmine__.
Jest el la herramienta que actualmente usa Facebook para testear  __React__.


## Ventajas
- usa Jasmine...........
- Todas las dependencias son mock..
- Encuentra y ejecuta automaticamente los tests
- Corre los tests en una implementacion falsa del DOM....

## Instalación

Primero debemos instalar las librerias necesarias:

Para poder hacer test a codigo __ES6__ debemos de tener instalado __Babel__ global
  npm i -g babel 

Instalamos el cliente de Jest para poder ejecutar los test desde consola
 npm i -g jest-cli

Luego instalamos en local las dependencias necesarias para react y jest
npm i -D babel-jest jest-cli react

## Configuración
Luego debemos configurar Jest en nuestro proyecto, para esto vamos al package.json y agregamos lo siguiente:


```
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
