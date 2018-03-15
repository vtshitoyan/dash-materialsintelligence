import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper'
import Logger from 'console-log-level';
import isTouchDevice from 'is-touch-device'
import Annotatable from './Annotatable.react';
import LabelsContainer from './LabelsContainer.react';


/**
 * AnnotationContainer is a div containing Annotatable objects
 */
export default class AnnotationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { tokens: props.tokens,
                       selectedValue: props.selectedValue
                       }
        this.updateToken = this.updateToken.bind(this);
        this.updateLabel = this.updateLabel.bind(this);
        this.log = Logger({level: 'info'});
    }

    /**
     * This makes sure the values are always updated
     */
    componentWillReceiveProps(nextProps){
        if (nextProps.doi != this.props.doi) {
            this.setState({
                tokens: nextProps.tokens,
                selectedValue: nextProps.selectedValue
            });
        }
    }

    updateToken(rowIndex, index, id, newAnnotation){
        if (id == rowIndex + '-' + this.state.tokens[rowIndex][index]['id']) { // safety check
            var newTokens = update(
                    this.state.tokens,
                    {[rowIndex]: {[index]: {annotation : {$set: newAnnotation}}}});
            this.setState({
                tokens: newTokens
            });
            this.props.setProps({tokens: newTokens}) // for dash
        }
    }

    updateLabel(newLabelValue){
        this.setState({
            selectedValue: newLabelValue
        });
        this.props.setProps({selectedValue: newLabelValue}) // for dash
    }

    render() {
        const {id, className, labels} = this.props;
        var touch = isTouchDevice()
        const {tokens, selectedValue} = this.state
        var hasTokens = (typeof tokens !== 'undefined')
        return (
            <div id={id} className={className}>
            <LabelsContainer
                id={id + '-labels'}
                className={"labels"}
                labels={labels}
                selectedValue={selectedValue}
                updateLabelCallback={this.updateLabel}/>
            <div>
                {typeof tokens !== 'undefined' && tokens.map((tokenRow, rowIndex) => {
                     return (
                         <div
                            key={rowIndex}
                            id={id + '-tokens-' + rowIndex}
                            className={'tokens-row tokens-' + rowIndex}>
                         {tokenRow.map((token, index) => {
//                            this.log.info(tokens[rowIndex][index])
                            return [<Annotatable
                                className="token"
                                key={rowIndex.toString() + '-' + index.toString()}
                                index={index}
                                rowIndex={rowIndex}
                                touch={touch}
                                annotation={hasTokens && tokens[rowIndex][index]['annotation']}
                                currentLabel={selectedValue}
                                value={token.text}
                                id={rowIndex + '-' + tokens[rowIndex][index]['id']}
                                updateCallback={this.updateToken}/>, <span> </span>]
                         })}</div>
                     )
                })}

            </div></div>
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
    tokens: PropTypes.arrayOf(PropTypes.arrayOf(
        PropTypes.shape(
            {
                start: PropTypes.number.isRequired,
                end: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired,
                annotation: PropTypes.string,
                id: PropTypes.string
            }
        )
    )),

    /**
     * This goes in to create the labels
     */
    labels: LabelsContainer.propTypes.labels,

    /**
     * Start indices opf tokens that are already identified/annotated
     */
    selectedValue: PropTypes.string.isRequired,

    /**
     * Unique doi for the container
     */
    doi: PropTypes.string.isRequired
};
