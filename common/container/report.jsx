import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeader,
    TableHeaderColumn,
    TableFooter,
} from 'material-ui/Table';

import style from '../style';

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //const date = (new Date().toISOString().split('T')[0]);
            date: new Date(),
        };
    }

    handleChange(date) {
        this.setState({
            date,
        });
    }

    render() {
        return (
            <div style={style.container}>
                <h2 style={{
                    textAlign: 'center',
                }}>
                    <DatePicker
                        hintText="根据日期查询评测报告"
                        container="inline"
                        mode="landscape"
                        disableYearSelection={true}
                        autoOk={true}
                        value={this.state.date}
                        onChange={(e, date) => {
                            this.handleChange(date);
                        }}
                        style={{
                            display: 'inline-block',
                        }}
                        textFieldStyle={{
                            width: '96px',
                        }}
                    />
                    测评报告
                </h2>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>序号</TableHeaderColumn>
                            <TableHeaderColumn>姓名</TableHeaderColumn>
                            <TableHeaderColumn>手机</TableHeaderColumn>
                            <TableHeaderColumn>分数</TableHeaderColumn>
                            <TableHeaderColumn>日期</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn style={{
                                textAlign: 'right',
                            }}>共100份</TableRowColumn>
                        </TableRow>
                    </TableFooter>
                    <TableBody
                        displayRowCheckbox={false}
                        stripedRows={true}
                    >
                        <TableRow>
                            <TableRowColumn>1</TableRowColumn>
                            <TableRowColumn>克念</TableRowColumn>
                            <TableRowColumn>18610519156</TableRowColumn>
                            <TableRowColumn>100</TableRowColumn>
                            <TableRowColumn>2016.6.1</TableRowColumn>
                            <TableRowColumn>详细</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>2</TableRowColumn>
                            <TableRowColumn>克璟</TableRowColumn>
                            <TableRowColumn>18610519157</TableRowColumn>
                            <TableRowColumn>100</TableRowColumn>
                            <TableRowColumn>2016.6.2</TableRowColumn>
                            <TableRowColumn>详细</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>克勤</TableRowColumn>
                            <TableRowColumn>18610519158</TableRowColumn>
                            <TableRowColumn>100</TableRowColumn>
                            <TableRowColumn>2016.6.3</TableRowColumn>
                            <TableRowColumn>详细</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

}


function select(state) {
    return state;
}


export default connect(select)(Report);
