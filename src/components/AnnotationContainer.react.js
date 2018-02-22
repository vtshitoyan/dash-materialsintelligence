import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper'
import Logger from 'console-log-level';
import Annotatable from './Annotatable.react';
import LabelsContainer from './LabelsContainer.react';


/**
 * AnnotationContainer is a div containing Annotatable objects
 */
export default class AnnotationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { annotations: props.annotations, selectedValue: props.selectedValue }
        this.updateAnnotation = this.updateAnnotation.bind(this);
        this.updateLabel = this.updateLabel.bind(this);
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

    updateAnnotation(rowIndex, index, id, newAnnotation){
        if (id == rowIndex + '-' + this.state.annotations[rowIndex][index]['id']) { // safety check
            this.setState({
                annotations: update(
                    this.state.annotations,
                    {[rowIndex]: {[index]: {annotation : {$set: newAnnotation}}}})
            })
        }
    }

    updateLabel(newLabelValue){
        this.setState({
            selectedValue: newLabelValue
        });
    }

    render() {
        const {id, className, tokens, labels} = this.props;
        var hasAnnotations = (typeof this.state.annotations !== 'undefined')
        return (
            <div id={id} className={className}>
            <LabelsContainer
                id={id + '-labels'}
                className={"labels"}
                labels={labels}
                selectedValue={this.state.selectedValue}
                updateLabelCallback={this.updateLabel}/>
            <div>
                {typeof tokens !== 'undefined' && tokens.map((tokenRow, rowIndex) => {
                     return (
                         <div
                            key={rowIndex}
                            id={id + '-annotation-' + rowIndex}
                            className={'annotation-' + rowIndex}>
                         {tokenRow.map((token, index) => {
                            return [<Annotatable
                                className="token"
                                key={rowIndex.toString() + '-' + index.toString()}
                                index={index}
                                rowIndex={rowIndex}
                                annotation={hasAnnotations && this.state.annotations[rowIndex][index]['annotation']}
                                currentLabel={this.state.selectedValue}
                                value={token.text}
                                id={rowIndex + '-' + this.state.annotations[rowIndex][index]['id']}
                                updateCallback={this.updateAnnotation}/>, <span> </span>]
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
                text: PropTypes.string.isRequired
            }
        )
    )),

    /**
     * Start indices opf tokens that are already identified/annotated
     */
    annotations: PropTypes.arrayOf(PropTypes.arrayOf(
        PropTypes.shape(
            {
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
    selectedValue: PropTypes.string.isRequired
};
