import React, {
    Component,
} from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
} from 'material-ui/Card';


export default class UserCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let cardHeader = null;
        if (this.props.user.name) {
            cardHeader = (
                <CardHeader
                    title={`${this.props.user.name} (${this.props.user.phone})`}
                    subtitle={`${this.props.user.industry} - ${this.props.user.position} - ${this.props.user.age}`}
                />
            );
        }
        return (
            <Card style={{
                padding: '16px',
            }}>
                {cardHeader}
            </Card>
        );
    }

}
