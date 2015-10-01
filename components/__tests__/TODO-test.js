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
