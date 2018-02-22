import React from 'react';
import {shallow} from 'enzyme';
import DropdownCreatable from '../DropdownCreatable.react';

describe('DropdownCreatable', () => {

    it('renders', () => {
        const component = shallow(<DropdownCreatable className="testClass"/>);
        expect(component).to.be.ok;
    });
});
