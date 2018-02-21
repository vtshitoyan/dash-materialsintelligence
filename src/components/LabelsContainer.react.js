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

    /**
     * This makes sure the values are always updated
     */
    componentWillReceiveProps(nextProps){
        this.setState({
            labels: nextProps.labels,
            selectedValue: nextProps.selectedValue
            })
    }

    updateLabel(changeEvent){
        this.setState({ selectedValue: changeEvent.target.value });
        this.props.updateLabelCallback( // updates the parent
            changeEvent.target.value)
    }

    render() {
        const {id, className, labels} = this.props;
        return (
            <div id={id}
                  className={className}
            >
                {typeof labels !== 'undefined' && labels.map(function(label, index) {
                    return <label key={index}><input
                        className={'highlighted label ' + label.value}
                        type="radio"
                        key={index}
                        checked={this.state.selectedValue === label.value}
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
