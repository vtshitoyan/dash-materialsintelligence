import React, {Component} from 'react';
import { Creatable } from 'react-select';
import PropTypes from 'prop-types';

/**
 * ReactSelect extends react-select to work with dash
 */
export default class DropdownCreatable extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value };
    }

    updateState(element) {
        this.setState({ value: element });
        this.props.setProps({value: element}) // for dash
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.value != this.state.value) {
            this.setState({
                value: nextProps.value
                });
        }
    }

    render() {
        const promptTextCreator = label =>  `${this.props.promptText} "${label}"`
        return <Creatable {...this.props}
                       value={this.state.value}
                       promptTextCreator={promptTextCreator}
                       onChange={this.updateState.bind(this)}
                       />
    }
}

DropdownCreatable.propTypes = {
    /**
     * select options
     */
    options: PropTypes.array,

    /**
     * the id
     */
    id: PropTypes.string,

    /**
     * multi-select or not
     */
    multi: PropTypes.bool,

    /**
     * selected value
     */
    value: PropTypes.any,

    /**
     * placeholder
     */
    placeholder: PropTypes.string,

    /**
     * propmpt text when new option is created
     */
    promptText: PropTypes.string,

    /**
     * className
     */
    className: PropTypes.string
};