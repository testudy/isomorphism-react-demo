import React, {
    Component,
} from 'react';
import {
    connect,
} from 'react-redux';
import {
    Link,
} from 'react-router';
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
import {
    fetchTests,
} from '../action/backend.jsx';

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
        this.fetchTests();
    }

    dateFormat(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dateOfMonth = date.getDate();
        return `${year}-${month}-${dateOfMonth}`;
    }

    fetchTests() {
        const date = this.dateFormat(this.state.date);
        this.props.dispatch(fetchTests(date));
    }

    handleChange(date) {
        console.log(date);
        this.setState({
            date,
        });
        this.fetchTests();
    }

    render() {
        console.log(this.props.tests);
        const tests = this.props.tests[this.dateFormat(this.state.date)] || [];
        const rows = tests.map((test, index) => {
            return (
                <TableRow key={`report-test-${test._id}`}>
                    <TableRowColumn style={style.tableCell}>{index + 1}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.name}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.age}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.age}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.age}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.score1}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.score2}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.score3}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.score4}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>{test.score}</TableRowColumn>
                    <TableRowColumn style={style.tableCell}>
                        <a href={`/${test.date}/${test.name}/${test.phone}`} target="_blank">详情</a>
                    </TableRowColumn>
                </TableRow>
            );
        });
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
                            console.log(date);
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
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn style={style.tableCell}>序号</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>姓名</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>年龄</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>现行业</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>现职位</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>概念分</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>策略分</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>批判分</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>信息分</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>总分</TableHeaderColumn>
                            <TableHeaderColumn style={style.tableCell}>操作</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableFooter>
                        <TableRow>
                            <TableRowColumn style={{
                                textAlign: 'right',
                            }}>共{tests.length}份</TableRowColumn>
                        </TableRow>
                    </TableFooter>
                    <TableBody
                        displayRowCheckbox={false}
                        stripedRows={true}
                    >
                        {rows}
                    </TableBody>
                </Table>
            </div>
        );
    }

}


Report.propTypes = {
};


function select(state) {
    return {
        tests: state.tests || {},
    };
}


export default connect(select)(Report);
