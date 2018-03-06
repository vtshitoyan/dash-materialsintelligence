import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logger from 'console-log-level';


/**
 * LabelsContainer is a div containing labels
 */
export default class LabelsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedValue: props.selectedValue };
        this.updateLabel = this.updateLabel.bind(this);
        this.log = Logger({level: 'info'});
    }

    updateLabel(changeEvent){
        this.setState({ selectedValue: changeEvent.target.value });
        this.props.updateLabelCallback( // updates the parent
            changeEvent.target.value)
    }

    /**
     * This makes sure the values are always updated
     */
    componentWillReceiveProps(nextProps){
        if (nextProps.labels != this.props.labels) {
            this.setState({
                selectedValue: nextProps.selectedValue
            });
        }
    }

    render() {
        const {id, className, labels} = this.props;
        return (
            <div id={id}
                  className={className}>
                <span>Labels:</span>
                {typeof labels !== 'undefined' && labels.map(function(label, index) {
                    var labelClass = label.value
                    var isChecked = this.state.selectedValue === label.value
                    if (isChecked) {
                        labelClass += ' selected';
                    }
                    return <label key={index}
                        className={'highlighted label ' + labelClass}><input
                        type="radio"
                        key={index}
                        checked={isChecked}
                        value={label.value}
                        onChange={this.updateLabel}/>{label.text}
                        </label>
                }, this)}

            </div>
        );
    }
}

LabelsContainer.propTypes = {
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
    labels: PropTypes.arrayOf(
        PropTypes.shape(
            {
                value: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired
            }
        )
    ),

    /**
     * Start indices opf tokens that are already identified/annotated
     */
    selectedValue: PropTypes.string.isRequired
};
