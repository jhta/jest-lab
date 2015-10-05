import React from 'react/addons';
const {TestUtils} = React.addons;

jest.dontMock('../TODO.jsx');

describe('TODO', () => {
  //definimos el componente a Testear
  const TODO = require('../TODO.jsx');
  const TodoComponent = TestUtils.renderIntoDocument(<TODO defaultText="new task"/>);
  describe('Definicion de elementos', () => {
    //con TestUtils renderizamos un componente al cual le podemos pasar datos
    it("El componente debe estar definido", () => {
      expect(TestUtils.isCompositeComponent(TodoComponent)).toBeTruthy();
    });
    //verifiquemos que el formulario exista
    it('El tag formulario y input deben de existir en el DOM', () => {
      const input = TestUtils.findRenderedDOMComponentWithTag(TodoComponent, 'input');
      expect(TestUtils.isDOMComponent(input)).toBeTruthy();
    });
  });

  describe('Funcionalidad', () => {

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

    it('si al enviar el formulario este esta vacio no deberia crear la tarea', () => {
      const Todo = TestUtils.renderIntoDocument(<TODO defaultText=""/>);
      const input = TestUtils.findRenderedDOMComponentWithTag(Todo, 'input');
      TestUtils.Simulate.change(input);
      //Simulamos el keDown de la letra #13 de enter
      TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
      const items = TestUtils.scryRenderedDOMComponentsWithClass(Todo, 'TODO-Item');
      //al crear una tarea, verificamos que el largo sea mayor que cero
      expect(items.length === 0).toBeTruthy();
    });

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

    it('Si le doy en el icono de borrar en algun elemento, deberia de eliminarlo', () => {
      const Todo = TestUtils.renderIntoDocument(<TODO defaultText="task"/>);
      const input = TestUtils.findRenderedDOMComponentWithTag(Todo, 'input');
      TestUtils.Simulate.change(input);
      //Simulamos el keDown de la letra #13 de enter
      TestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
      const deleteIcons = TestUtils.scryRenderedDOMComponentsWithClass(Todo, 'TODO-ItemDeleteIcon');
      TestUtils.Simulate.click(deleteIcons[0]);
      const items = TestUtils.scryRenderedDOMComponentsWithClass(Todo, 'TODO-Item');
      expect(items.length === 0).toBeTruthy();
    });
  });
});
