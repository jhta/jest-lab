import React from 'react/addons';
const {TestUtils} = React.addons;

jest.dontMock('../TODO');

describe('TODO', () => {
  //definimos el componente a Testear
  const TODO = require('../TODO.jsx');
  describe('Definicion de elementos', () => {
    //con TestUtils renderizamos un componente al cual le podemos pasar datos
    const TodoComponent = TestUtils.renderIntoDocument(<TODO/>);
    it("El componente debe estar definido", () => {
      expect(TodoComponent).toBeDefined();
    });

    //verifiquemos que el formulario exista
    it('El tag formulario y input deben de existir en el DOM', () => {
      const form = TestUtils.findRenderedDOMComponentWithTag(TodoComponent, 'form');
      const input = TestUtils.findRenderedDOMComponentWithTag(TodoComponent, 'input');
      expect(form).toBeDefined();
      expect(input).toBeDefined();
    });
  });

});
