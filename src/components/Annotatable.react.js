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
        this.state = {
            hover: false,
            annotation: props.annotation,
            currentLabel: props.currentLabel,
            extraText: ''};
        this.handleHover = this.handleHover.bind(this);
        this.annotate = this.annotate.bind(this);
        this.log = Logger({level: 'info'});
    }

    /**
     * This makes sure the values are always updated
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            currentLabel: nextProps.currentLabel
        })
        if (this.props.value != nextProps.value) {
            this.setState({
                annotation: nextProps.annotation,
                hover: nextProps.hover,
                extraText: ''
            })
        }
    }

    handleHover(e){
        if (e.type == 'mouseleave') {
            this.setState({ hover: false });
        } else {
            this.setState({ hover: true });
        }
    }

    annotate() {
        var newState = this.props.passiveAnnotation;
        if (null != this.props.currentLabel && this.props.currentLabel != this.state.annotation) {
            newState = this.props.currentLabel;
        }
        this.setState({
            annotation: newState
        });
        this.props.updateCallback( // updates the parent
            this.props.rowIndex,
            this.props.index,
            this.props.id,
            newState)
    }

    render() {
        const {id, className, value, touch, passiveAnnotation} = this.props;
        let spanClass = [className]
        if(this.state.hover&&!touch) {
            if (this.state.annotation instanceof Array) {
                spanClass.push('disagreement')  // no change for disagreement text
            } else {
                spanClass.push(this.state.currentLabel)
            }
            spanClass.push('highlighted')
        } else if (this.state.annotation != null) {
            spanClass.push(this.state.annotation)
            spanClass.push('highlighted')
            if (this.state.annotation instanceof Array) {
                spanClass.push('disagreement')
            } else if (this.state.annotation == passiveAnnotation) {
                spanClass.push('passive')
            }
        }

        // adding annotation disagreement text
        if (this.state.annotation instanceof Array) {
            var disagreementText = this.state.annotation.filter(x => x != null).join(', ')
            if (this.state.extraText != ' (' + disagreementText + ')') {
                this.setState({ extraText: ' (' + disagreementText + ')'})
            }
        } else {
            if (this.state.extraText != '') {
                this.setState({ extraText: ''})
            }
        }

        const modifiedClass = spanClass.join(' ')

        return (
            <span id={id}
                  className={modifiedClass}
                  onMouseEnter={(e) => this.handleHover(e)}
                  onMouseLeave={(e) => this.handleHover(e)}
                  onClick={this.annotate}
            >
                {value + this.state.extraText}
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
     * Initial className
     */
    className: PropTypes.string,

     /**
     * The selected label that will be assigned to the object annotation when it is clicked
     */
    currentLabel: PropTypes.string,

    /**
     * The annotation of the object that changes when the object is clicked
     */
    annotation: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.arrayOf(PropTypes.string)
                ]),
    /**
     * Annotation that will not change and is just for styling / highlighting
     */
    passiveAnnotation: PropTypes.oneOfType([
                           PropTypes.string,
                           PropTypes.arrayOf(PropTypes.string)
                       ]),

    /**
     * The value is the text
     */
    value: PropTypes.string
};
