import React, {
    Component,
} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class QuestionType extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SelectField style={this.props.selectStyle} value={this.props.type} onChange={(event, index, value) => this.props.onTypeChange(value)}>
                <MenuItem value={1} primaryText="概念性推理" />
                <MenuItem value={2} primaryText="策略性推理" />
                <MenuItem value={3} primaryText="批判性评估" />
                <MenuItem value={4} primaryText="复杂信息理解" />
            </SelectField>
        );
    }

}
