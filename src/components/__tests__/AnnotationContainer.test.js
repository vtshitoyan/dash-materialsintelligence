import React from 'react';
import {shallow} from 'enzyme';
import AnnotationContainer from '../AnnotationContainer.react';

describe('AnnotationContainer', () => {

    it('renders', () => {
        const component = shallow(
        <AnnotationContainer
            className="random stuff"
            tokens={[
                {'text': 'a', 'start': 1, 'end': 10},
                {'text': 'b', 'start': 11, 'end': 21}
                ]}
            annotations={[
                {'id': 'token-0-1', 'annotation': false},
                {'id': 'token-1-2', 'annotation': true}
                ]}
        />);

        expect(component).to.be.ok;
    });
});
