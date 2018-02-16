import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logger from 'console-log-level';

/**
 * Annotatable is a clickable and selectable
 * Span component used to annotate a list of strings.
 */
export default class Annotatable extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: false, selected: props.isSelected };
        this.handleHover = this.handleHover.bind(this);
        this.annotate = this.annotate.bind(this);
        this.log = Logger({level: 'info'});
    }

    /**
     * This makes sure the values are always updated
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            hover: false,
            selected: nextProps.isSelected,
            value: nextProps.value
            })
    }

    handleHover(){
        this.setState({
            hover: !this.state.hover
        });
    }

    annotate() {
        var newState = !this.state.selected
        this.setState({
            selected: newState
        });
        this.props.updateCallback( // updates the parent
            this.props.index,
            this.props.id,
            newState)
    }

    render() {
        const {id, className, value} = this.props;
        let spanClass = [className]
        if(this.state.hover) {
            spanClass.push('highlighted')
//            spanClass.push('mtl')
        }

        if(this.state.selected) {
            spanClass.push('mtl')
            spanClass.push('highlighted')
        }

        const modifiedClass = spanClass.join(' ')

        return (
            <span id={id}
                  className={modifiedClass}
                  onMouseEnter={this.handleHover}
                  onMouseLeave={this.handleHover}
                  onClick={this.annotate}
            >
                {value}
            </span>
        );
    }
}

Annotatable.propTypes = {
    /**
     * The ID used to identify this compnent in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    className: PropTypes.string,

     /**
     * A label that will be printed when this component is rendered.
     */
    isSelected: PropTypes.bool,

    /**
     * The value is the text
     */
    value: PropTypes.string
};
