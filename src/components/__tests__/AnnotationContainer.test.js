import React from 'react';
import {shallow} from 'enzyme';
import AnnotationContainer from '../AnnotationContainer.react';

describe('AnnotationContainer', () => {

    it('renders', () => {
        const component = shallow(
        <AnnotationContainer
            className="random stuff"
            labels={[{'text': 'Material', 'value': 'material'},
                     {'text': 'Inorganic Crystal', 'value': 'inorganic_crystal'},
                     {'text': 'Main Material', 'value': 'main_material'}]}
            tokens={[[{'text': 'ab', 'start': 1, 'end': 3},
                           {'text': 'cd', 'start': 4, 'end': 6},
                           {'text': 'ef', 'start': 7, 'end': 9},
                           {'text': '.', 'start': 9, 'end': 10},
                           {'text': 'gf', 'start': 11, 'end': 13}],
                           [{'text': 'AB', 'start': 1, 'end': 3},
                           {'text': 'CD', 'start': 4, 'end': 6},
                           {'text': 'EF', 'start': 7, 'end': 9},
                           {'text': '.', 'start': 9, 'end': 10},
                           {'text': 'GF', 'start': 11, 'end': 13}]]}
            annotations={[[{'id': 'token-0-2', 'annotation': null},
                      {'id': 'token-3-5', 'annotation': 'material'},
                      {'id': 'token-6-8', 'annotation': null},
                      {'id': 'token-8-9', 'annotation': 'inorganic_crystal'},
                      {'id': 'token-10-12', 'annotation': null}],
                      [{'id': 'token-0-2', 'annotation': 'main_material'},
                      {'id': 'token-3-5', 'annotation': null},
                      {'id': 'token-6-8', 'annotation': null},
                      {'id': 'token-8-9', 'annotation': null},
                      {'id': 'token-10-12', 'annotation': null}]]}
            selectedValue='material'
        />);

        expect(component).to.be.ok;
    });
});
