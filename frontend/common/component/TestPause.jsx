import React, {
    Component,
} from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import {
    RadioButton,
    RadioButtonGroup,
} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';


export default class TestPause extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Card style={{
                padding: '16px',
            }}>
                <CardText style={{
                    padding: 0,
                    margin: '16px 0',
                }}>
                    <div style={{
                        textAlign: 'center',
                    }}>
                        <ActionSchedule style={{
                            width: 96,
                            height: 96,
                        }}/>
                    </div>
                </CardText>
            </Card>
        );
    }

}
