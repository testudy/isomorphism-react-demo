import React, {
    Component,
} from 'react';
import Paper from 'material-ui/Paper';
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
import TextField from 'material-ui/TextField';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';


export default class Question extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper style={{
                width: '960px',
                paddingTop: '68px',
                margin: 'auto auto  68px',
            }}>
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
                <Card style={{
                    padding: '16px',
                }}>
                    <CardHeader
                        title="个人信息填写"
                        style={{
                            padding: 0,
                            margin: '0 0 16px 0',
                        }}
                    />
                    <CardText style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <TextField
                            hintText="王少伟"
                            errorText="请填写您的姓名，方便我们后续和您联系"
                            floatingLabelText="您的姓名"
                        />
                        <br />
                        <TextField
                            hintText="186-1051-9100"
                            errorText="请填写您的手机号码，方便我们后续和您联系"
                            floatingLabelText="您的手机号码"
                        />
                    </CardText>
                </Card>
                <Card style={{
                    padding: '16px',
                }}>
                    <CardHeader
                        title="1、有人为了测试大猩猩聪明程度，特地在大猩猩面前放了一叠百元纸币和一部相机，请问猩猩会选哪个？"
                        style={{
                            padding: 0,
                            margin: '0 0 16px 0',
                        }}
                    />
                    <CardActions style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <RadioButtonGroup name="question1">
                            <RadioButton
                                value="0"
                                label="A、纸币"
                            />
                            <RadioButton
                                value="1"
                                label="B、相机"
                            />
                            <RadioButton
                                value="2"
                                label="C、两个都选"
                            />
                            <RadioButton
                                value="3"
                                label="C、都不选，找食物"
                            />
                        </RadioButtonGroup>
                    </CardActions>
                </Card>
                <Card style={{
                    padding: '16px',
                }}>
                    <CardHeader
                        title="2、用一支粉笔，在黑板上画一个正方形，最少需要几笔(每一笔不能拐弯)？"
                        style={{
                            padding: 0,
                            margin: '0 0 16px 0',
                        }}
                    />
                    <CardText style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <img
                            style={{
                                maxWidth: '100%',
                            }}
                            src="http://lorempixel.com/600/337/nature/?t=1"
                        />
                    </CardText>
                    <CardActions style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <RadioButtonGroup name="question1">
                            <RadioButton
                                value="0"
                                label="A、1"
                            />
                            <RadioButton
                                value="1"
                                label="B、2"
                            />
                            <RadioButton
                                value="2"
                                label="C、3"
                            />
                            <RadioButton
                                value="3"
                                label="C、4"
                            />
                        </RadioButtonGroup>
                    </CardActions>
                </Card>
                <Card style={{
                    padding: '16px',
                }}>
                    <CardHeader
                        title="3、唐僧最喜欢哪个女妖精，谁最知道？"
                        style={{
                            padding: 0,
                            margin: '0 0 16px 0',
                        }}
                    />
                    <CardActions style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <Checkbox
                            value="0"
                            label="A、孙悟空"
                        />
                        <Checkbox
                            value="1"
                            label="B、猪八戒"
                        />
                        <Checkbox
                            value="2"
                            label="C、沙和尚"
                        />
                        <Checkbox
                            value="3"
                            label="C、白龙马"
                        />
                    </CardActions>
                </Card>
                <Card style={{
                    padding: '16px',
                }}>
                    <CardHeader
                        title="4、如果我们叫张家为张户，李家为李户，那么我们不能这样称呼哪家呢？"
                        style={{
                            padding: 0,
                            margin: '0 0 16px 0',
                        }}
                    />
                    <CardText style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <img
                            style={{
                                maxWidth: '100%',
                            }}
                            src="http://lorempixel.com/600/337/nature/?t=2"
                        />
                    </CardText>
                    <CardActions style={{
                        padding: 0,
                        margin: '16px 0',
                    }}>
                        <Checkbox
                            value="0"
                            label="A、马"
                        />
                        <Checkbox
                            value="1"
                            label="B、孙"
                        />
                        <Checkbox
                            value="2"
                            label="C、赵"
                        />
                        <Checkbox
                            value="3"
                            label="C、杨"
                        />
                    </CardActions>
                </Card>
            </Paper>
        );
    }

}
