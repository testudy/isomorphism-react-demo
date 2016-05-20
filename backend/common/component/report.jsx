import React, {
    Component,
} from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeader,
    TableHeaderColumn,
    TableFooter,
} from 'material-ui/Table';


export default class Report extends Component {

    render() {
        return (
            <Table style={{width: '960px', margin: 'auto'}}>
                <TableHeader>
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
                        <TableRowColumn style={{textAlign: 'right'}}>共100份</TableRowColumn>
                    </TableRow>
                </TableFooter>
                <TableBody stripedRows={true}>
                    <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>克念</TableRowColumn>
                        <TableRowColumn>18610519156</TableRowColumn>
                        <TableRowColumn>100</TableRowColumn>
                        <TableRowColumn>2016.6.1</TableRowColumn>
                        <TableRowColumn>详细，完成</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>2</TableRowColumn>
                        <TableRowColumn>克璟</TableRowColumn>
                        <TableRowColumn>18610519157</TableRowColumn>
                        <TableRowColumn>100</TableRowColumn>
                        <TableRowColumn>2016.6.2</TableRowColumn>
                        <TableRowColumn>详细，完成</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>3</TableRowColumn>
                        <TableRowColumn>克勤</TableRowColumn>
                        <TableRowColumn>18610519158</TableRowColumn>
                        <TableRowColumn>100</TableRowColumn>
                        <TableRowColumn>2016.6.3</TableRowColumn>
                        <TableRowColumn>详细，完成</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

}