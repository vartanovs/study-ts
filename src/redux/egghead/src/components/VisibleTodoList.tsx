import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getErrorMessage, getIsFetching, getVisibleTodos, State } from '../reducers';
import * as actions from '../actions';

import FetchError from './FetchError';
import TodoList from './TodoList';

import { Todo } from '../types';

interface VisibleTodoListProps {
  errorMessage: string;
  fetchTodos: (filter: string) => void;
  filter: string;
  isFetching: boolean;
  toggleTodo: (id: string) => void;
  todos: Todo[];
}

class VisibleTodoList extends Component<VisibleTodoListProps> {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: VisibleTodoListProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { fetchTodos, filter } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { errorMessage, isFetching, todos, toggleTodo } = this.props;
    if (isFetching && !todos.length) return (<p>...loading...</p>);
    if (errorMessage && !todos.length) return <FetchError message={errorMessage} onRetry={() => this.fetchData()}/>;
    return <TodoList onTodoClick={toggleTodo} todos={todos} />;
  }
}

interface VisibleTodoListStateProps {
  errorMessage: string;
  filter: string;
  isFetching: boolean;
  todos: Todo[];
}

interface VisibleTodoListOwnProps { match: { params: { filter?: string } } }

const mapStateToProps: MapStateToProps<VisibleTodoListStateProps, VisibleTodoListOwnProps, State> = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';
  return {
    errorMessage: getErrorMessage(state, filter),
    filter,
    isFetching: getIsFetching(state, filter),
    todos: getVisibleTodos(state, filter),
  };
};

// Actions in place of `mapDispatchToProps`
export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
