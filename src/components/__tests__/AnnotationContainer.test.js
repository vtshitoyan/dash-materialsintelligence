import React from 'react';
import {shallow} from 'enzyme';
import AnnotationContainer from '../AnnotationContainer.react';

describe('AnnotationContainer', () => {

    it('renders', () => {
        const component = shallow(
        <AnnotationContainer
            doi="random doi"
            className="random stuff"
            doi="test doi"
            labels={[{'text': 'Material', 'value': 'material'},
                     {'text': 'Inorganic Crystal', 'value': 'inorganic_crystal'},
                     {'text': 'Main Material', 'value': 'main_material'}]}
            tokens={[[{'id': 'token-0-2', 'text': 'ab', 'start': 0, 'end': 2, 'annotation': [null, 'main_material']},
                       {'id': 'token-3-5', 'text': 'cd', 'start': 3, 'end': 5, 'annotation': 'passive_label'},
                       {'id': 'token-6-8', 'text': 'ef', 'start': 6, 'end': 8, 'annotation': ['main_material', 'material']},
                       {'id': 'token-8-9', 'text': '.', 'start': 8, 'end': 9, 'annotation': null},
                       {'id': 'token-10-12', 'text': 'gf', 'start': 10, 'end': 12, 'annotation': 'material'}],
                       [{'id': 'token-0-2', 'text': 'AB', 'start': 0, 'end': 2, 'annotation': null},
                       {'id': 'token-3-5', 'text': 'CD', 'start': 3, 'end': 5, 'annotation': null},
                       {'id': 'token-6-8', 'text': 'EF', 'start': 6, 'end': 8, 'annotation': null},
                       {'id': 'token-8-9', 'text': '.', 'start': 8, 'end': 9, 'annotation': 'inorganic_crystal'},
                       {'id': 'token-10-12', 'text': 'GF', 'start': 10, 'end': 12, 'annotation': null}]]}

            selectedValue='material'
        />);

        expect(component).to.be.ok;
    });
});
