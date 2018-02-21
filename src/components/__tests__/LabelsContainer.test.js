import React from 'react';
import {shallow} from 'enzyme';
import LabelsContainer from '../LabelsContainer.react';

describe('LabelsContainer', () => {

    it('renders', () => {
        const component = shallow(
        <LabelsContainer
            className="random label container"
            labels={[
                {'text': 'Material', 'value': 'material'},
                {'text': 'Inorganic Crystal', 'value': 'inorganic_crystal'}
                ]}
            selectedValue='material'
        />);

        expect(component).to.be.ok;
    });
});
