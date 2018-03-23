import React from 'react';
import {shallow} from 'enzyme';
import Annotatable from '../Annotatable.react';

describe('Annotatable', () => {

    it('renders', () => {
        const component = shallow(<Annotatable annotation={['material', 'inorganic_crystal']} current_label="inorganic_crystal"/>);
        expect(component).to.be.ok;
    });
});
