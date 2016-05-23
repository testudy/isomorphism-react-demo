import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


import React, {
    Component,
} from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppHeader from '../../common/component/app-header.jsx';
import Question from '../../common/component/question.jsx';


const questions = [
    {
        id: 1,
        title: '有人为了测试大猩猩聪明程度，特地在大猩猩面前放了一叠百元纸币和一部相机，请问猩猩会选哪个？',
        options: [
            '纸币',
            '相机',
            '两个都选',
            '都不选，找食物',
        ],
    },
    {
        id: 2,
        title: '用一支粉笔，在黑板上画一个正方形，最少需要几笔(每一笔不能拐弯)？',
        image: 'http://lorempixel.com/600/337/nature/?t=1',
        options: [
            '1',
            '2',
            '3',
            '4',
        ],
    },
    {
        id: 3,
        title: '唐僧最喜欢哪个女妖精，谁最知道？',
        options: [
            '孙悟空',
            '猪八戒',
            '沙和尚',
            '白龙马',
        ],
    },
    {
        id: 6,
        title: '如果我们叫张家为张户，李家为李户，那么我们不能这样称呼哪家呢？',
        image: 'http://lorempixel.com/600/337/nature/?t=2',
        options: [
            '马',
            '孙',
            '赵',
            '杨',
        ],
        multi: true,
    },
];


class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppHeader />
                    <Question questions={questions} />
                </div>
            </MuiThemeProvider>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));
