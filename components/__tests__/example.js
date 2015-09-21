import React from 'react/addons';
const {TestUtils} = React.addons;

jest.dontMock('../example');
jest.dontMock('../CheckboxWithLabel');


describe('Test component ', () => {
	const CheckboxWithLabel = require('../CheckboxWithLabel');
    const checkbox = TestUtils.renderIntoDocument(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
    
    describe('Prueba con un elemento', () => {
        it('deberia renderizar el elemento p y verificar si es igual a "hola"', () => {

            //cargo componente y le paso props
            //encuentro un tag dentro del componente
            //const label = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'label');
            //verifico el texto del tag como componente de react
            //expect(React.findDOMNode(label).textContent).toEqual('Off');
            //ecunentro el tag de input
            //const input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
            //simulo el evento on change
            //TestUtils.Simulate.change(input);
            //verifico si al cambiar con on change el valor del label paso de on a off
            //expect(React.findDOMNode(label).textContent).toEqual('On');

            const span = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'p');
            expect(TestUtils.isDOMComponent(span)).toBe(true);
            expect(TestUtils.isCompositeComponent(checkbox)).toBe(true);
            expect(React.findDOMNode(span).textContent).toEqual('hola');
        });
    });
    describe('Prueba multiples tags', () => {
        it('deberia renderizar una lista, verificar que el largo sea 2 y el primer elemento sea "uno"', () => {
            const lis = TestUtils.scryRenderedDOMComponentsWithTag(checkbox, 'li');
            expect(lis.length).toEqual(2);
            expect(React.findDOMNode(lis[0]).textContent).toBe("uno");
        })
    });

});
describe('First Test', function() {
	it('spec hello world', function() {
		var example = require('../example');
		expect(example()).toBe("Hello World");
	});
});
