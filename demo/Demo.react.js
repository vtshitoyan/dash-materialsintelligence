import React, {Component} from 'react';
import {Annotatable} from '../src';

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div>
                <h1>dash-materialsintelligence Demo</h1>

                <hr/>
                <h2>ExampleComponent</h2>
                <Annotatable
                    id="test-id"
                    value="bla bla"
                    class="abs-token"
                />
                <hr/>
            </div>
        );
    }
}

export default Demo;
