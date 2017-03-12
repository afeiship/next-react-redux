#next-redux-boot
> Redux boot enhanced version based on next toolkit.


## options:
| name | type | value | description |
| :----| :----| :----| :----|
| root  | ReactInstnace | null | Your root instance of the application |
| memory  | Object | {} | Application memory data storage |
| local  | Object | null | Application localStoarage |
| session  | Object | {} | Application sessionStoreage |
| request  | Object | {} | Application request data |



## usage:
```javascript
import 'components/styles/index.scss';
import './style';
import {ReduxBoot} from 'next-redux-boot';
import App from './app';

ReduxBoot.run(App,'app');
```


## initial your reducer:
```javascript
export default class extends ReduxAppBase {
  initialReducerState(){
    cosnt {dispatch} = AppBase;
    dispatch(ReduxActions.memory({test:1234,abc:'abcd'}));
  }

  componentDidMount(){
    console.dir(ReduxAppBase);
    const {dispatch} = ReduxAppBase;
    dispatch(ReduxActions.root(this));
    dispatch(ReduxActions.local({afei:'test',items:[{age:1},{age:2},{age:3}]}));
    dispatch(ReduxActions.session({afei2:'test2',items2:[{age:1},{age:2},{age:3}]}));
    dispatch(ReduxActions.memory({test:1234,abc:'abcd'}));
    console.log(ReduxAppBase.root());
    console.log(ReduxAppBase.local(['afei']));
    console.log(ReduxAppBase.local(['afei','items']));
    console.log(ReduxAppBase.session(['afei2']));
    console.log(ReduxAppBase.session(['afei2','items2']));
    console.log(ReduxAppBase.memory());
    console.log(ReduxAppBase.getState());
  }

  render() {
    return (
      <div className="blank-module-view">
        blank-module-view...
      </div>
    );
  }
}

```
