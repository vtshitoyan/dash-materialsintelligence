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
        this.log = Logger({level: 'info'});
    }

    /**
     * This makes sure the values are always updated
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            className: nextProps.className,
            tokens: nextProps.tokens,
            annotations: nextProps.annotations,
            id: nextProps.id
            })
    }

    render() {
        const {id, className, tokens, annotations} = this.props;
        var hasAnnotations = (typeof annotations !== 'undefined')
        return (
            <div id={id}
                  className={className}
            >
                {typeof tokens !== 'undefined' && tokens.map(function(token, index) {
                    return [<Annotatable
                        className="token"
                        key={id+index.toString()}
                        isSelected={hasAnnotations && annotations[index]}
                        value={token.text}
                        id={id+'-token-'+token.start.toString()+'-'+token.end.toString()}/>, <span> </span>]
                })}

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
    annotations: PropTypes.arrayOf(PropTypes.bool)
};
