/// <reference path="react-redux.d.ts" />
/// <reference path="../react/react.d.ts"/>
/// <reference path="../react/react-dom.d.ts"/>
/// <reference path="../redux/redux.d.ts" />
/// <reference path="../react-router/react-router.d.ts" />
/// <reference path="../object-assign/object-assign.d.ts" />

import { Component, ComponentClass, ReactElement } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, RouterState } from 'react-router';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import objectAssign = require('object-assign');

//
// Quick Start
// https://github.com/rackt/react-redux/blob/master/docs/quick-start.md#quick-start
//

interface CounterState {
    counter: number;
}
declare var increment: Function;

class Counter extends Component<any, CounterState> {
    render() {
        return (
            <button onClick={this.props.onIncrement}>
                {this.props.value}
            </button>
        );
    }
}

function mapStateToProps(state: CounterState) {
    return {
        value: state.counter
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onIncrement: () => dispatch(increment())
    };
}

connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);


@connect(mapStateToProps)
class CounterContainer extends Component<any, any> {

}

class App extends Component<any, any> {
    render(): JSX.Element {
        // ...
        return null;
    }
}

const targetEl = document.getElementById('root');

ReactDOM.render((
    <Provider store={store}>
        {() => <App />}
    </Provider>
), targetEl);

//
// API
// https://github.com/rackt/react-redux/blob/master/docs/api.md
//
declare var store: Store;
declare var routerState: RouterState;
class MyRootComponent extends Component<any, any> {

}
class TodoApp extends Component<any, TodoState> {

}
interface TodoState {
    todos: string[]|string;
}
interface TodoProps {
    userId: number;
}
interface DispatchProps {
    addTodo(userId: number, text: string): void;
}
declare var actionCreators: () => {
    action: Function;
}
declare var history: HistoryModule.History;
declare var addTodo: () => { type: string; };
declare var todoActionCreators: { [type: string]: (...args: any[]) => any; };
declare var counterActionCreators: { [type: string]: (...args: any[]) => any; };

ReactDOM.render(
  <Provider store={store}>
    {() => <MyRootComponent />}
  </Provider>,
  document.body
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}></Router>
  </Provider>,
  targetEl
);

// Inject just dispatch and don't listen to store

connect()(TodoApp);

// Inject dispatch and every field in the global state

connect((state: TodoState) => state)(TodoApp);

// Inject dispatch and todos

function mapStateToProps2(state: TodoState) {
    return { todos: state.todos };
}

export default connect(mapStateToProps2)(TodoApp);

// Inject todos and all action creators (addTodo, completeTodo, ...)

//function mapStateToProps(state) {
//    return { todos: state.todos };
//}

connect(mapStateToProps2, actionCreators)(TodoApp);

// Inject todos and all action creators (addTodo, completeTodo, ...) as actions

//function mapStateToProps(state) {
//    return { todos: state.todos };
//}

function mapDispatchToProps2(dispatch: Dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

connect(mapStateToProps2, mapDispatchToProps2)(TodoApp);

// Inject todos and a specific action creator (addTodo)

//function mapStateToProps(state) {
//    return { todos: state.todos };
//}

function mapDispatchToProps3(dispatch: Dispatch) {
    return bindActionCreators({ addTodo }, dispatch);
}

connect(mapStateToProps2, mapDispatchToProps3)(TodoApp);

// Inject todos, todoActionCreators as todoActions, and counterActionCreators as counterActions

//function mapStateToProps(state) {
//    return { todos: state.todos };
//}

function mapDispatchToProps4(dispatch: Dispatch) {
    return {
        todoActions: bindActionCreators(todoActionCreators, dispatch),
        counterActions: bindActionCreators(counterActionCreators, dispatch)
    };
}

connect(mapStateToProps2, mapDispatchToProps4)(TodoApp);

// Inject todos, and todoActionCreators and counterActionCreators together as actions

//function mapStateToProps(state) {
//    return { todos: state.todos };
//}

function mapDispatchToProps5(dispatch: Dispatch) {
    return {
        actions: bindActionCreators(objectAssign({}, todoActionCreators, counterActionCreators), dispatch)
    };
}

connect(mapStateToProps2, mapDispatchToProps5)(TodoApp);

// Inject todos, and all todoActionCreators and counterActionCreators directly as props

//function mapStateToProps(state) {
//    return { todos: state.todos };
//}

function mapDispatchToProps6(dispatch: Dispatch) {
    return bindActionCreators(objectAssign({}, todoActionCreators, counterActionCreators), dispatch);
}

connect(mapStateToProps2, mapDispatchToProps6)(TodoApp);

// Inject todos of a specific user depending on props

function mapStateToProps3(state: TodoState, ownProps: TodoProps): TodoState {
    return { todos: state.todos[ownProps.userId] };
}

connect(mapStateToProps3)(TodoApp);

// Inject todos of a specific user depending on props, and inject props.userId into the action

//function mapStateToProps(state) {
//    return { todos: state.todos };
//}

function mergeProps(stateProps: TodoState, dispatchProps: DispatchProps, ownProps: TodoProps): DispatchProps & TodoState {
    return objectAssign({}, ownProps, {
        todos: stateProps.todos[ownProps.userId],
        addTodo: (text: string) => dispatchProps.addTodo(ownProps.userId, text)
    });
}

connect(mapStateToProps2, actionCreators, mergeProps)(TodoApp);





interface TestProp {
    property1: number;
    someOtherProperty?: string;
}
interface TestState {
    isLoaded: boolean;
    state1: number;
}
class TestComponent extends Component<TestProp, TestState> { }
const WrappedTestComponent: ComponentClass<TestProp> = connect<TestProp, TestState>()(TestComponent);

// return value of the connect()(TestComponent) is of the type TestComponent
let ATestComponent: typeof TestComponent = null;
ATestComponent = TestComponent;
ATestComponent = WrappedTestComponent;

let anElement: ReactElement<TestProp>;
<TestComponent property1={42} />;
<WrappedTestComponent property1={42} />;
<ATestComponent property1={42} />;

class NonComponent {}
// this doesn't compile
//connect()(NonComponent);

// connect()(SomeClass) has the same constructor as SomeClass itself
class SomeClass extends Component<string, any> {
    constructor(public foo: string) { super() }
    public bar: number;
}
let bar: number = new (connect<string, any>()(SomeClass))("foo").bar;

declare function statelessComponent(prop: TestProp): ReactElement<TestProp>;

connect<TestProp, TestState>()(TestComponent);
connect<TestProp, any>()(statelessComponent);
