import React from 'react';
import {shallow} from 'enzyme';
import Annotatable from '../Annotatable.react';

describe('Annotatable', () => {

    it('renders', () => {
        const component = shallow(<Annotatable isSelected={true}/>);
        expect(component).to.be.ok;
    });
});
