import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logger from 'console-log-level';
import Annotatable from './Annotatable.react';


/**
 * AnnotationContainer is a div containing Annotatable objects
 */
export default class AnnotationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { annotations: props.annotations }
        this.updateAnnotation = this.updateAnnotation.bind(this);
        this.log = Logger({level: 'info'});
    }

    /**
     * This makes sure the values are always updated
     */
    componentWillReceiveProps(nextProps){
        this.setState({
            tokens: nextProps.tokens,
            annotations: nextProps.annotations
            })
    }

    updateAnnotation(index, id, newAnnotation){
        if (id == this.state.annotations[index]['id']) { // safety check
            this.state.annotations[index]['annotation'] = newAnnotation
        }
    }

    render() {
        const {id, className, tokens} = this.props;
        var hasAnnotations = (typeof this.state.annotations !== 'undefined')
        return (
            <div id={id}
                  className={className}
            >
                {typeof tokens !== 'undefined' && tokens.map(function(token, index) {
                    return [<Annotatable
                        className="token"
                        key={index}
                        index={index}
                        isSelected={hasAnnotations && this.state.annotations[index]['annotation']}
                        value={token.text}
                        id={this.state.annotations[index]['id']}
                        updateCallback={this.updateAnnotation}/>, <span> </span>]
                }, this)}

            </div>
        );
    }
}

AnnotationContainer.propTypes = {
    /**
     * The ID used to identify this compnent in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    className: PropTypes.string,

    /**
     * List of tokens used for the annotation
     */
    tokens: PropTypes.arrayOf(
        PropTypes.shape(
            {
                start: PropTypes.number.isRequired,
                end: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired
            }
        )
    ),

    /**
     * Start indices opf tokens that are already identified/annotated
     */
    annotations: PropTypes.arrayOf(
        PropTypes.shape(
            {
                annotation: PropTypes.bool.isRequired,
                id: PropTypes.string.isRequired
            }
        )
    )
};
