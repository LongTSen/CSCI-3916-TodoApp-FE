import {todoActionTypes as actionTypes} from '../constants';
import runtimeEnv from '@mars/heroku-js-runtime-env';
// import axios from "axios";

// axios.get('http://localhost:4000/todos/')
//     .then(response => {
//         this.setState({ todos: response.data });
//     })
//     .catch(function (error){
//         console.log(error);
//     })
// axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
//     .then(response => {
//         this.setState({
//             todo_description: response.data.todo_description,
//             todo_responsible: response.data.todo_responsible,
//             todo_priority: response.data.todo_priority,
//             todo_completed: response.data.todo_completed
//         })
//     })
//     .catch(function (error) {
//         console.log(error);
//     })

function todosFetched(todos) {
    return {
        type: actionTypes.FETCH_TODOS,
        todos: todos
    }
}

function todoFetched(todo) {
    return {
        type: actionTypes.FETCH_TODO,
        selectedTodo: todo
    }
}

function todoSet(todo) {
    return {
        type: actionTypes.SET_TODO,
        selectedTodo: todo
    }
}

function todoCreated(todo) {
    return {
        type: actionTypes.CREATE_TODO,
        selectedTodo: todo
    }
}

function todoUpdated(todo) {
    return {
        type: actionTypes.UPDATE_TODO,
        selectedTodo: todo
    }
}

function todoDeleted(todo) {
    return {
        type: actionTypes.DELETE_TODO,
        selectedTodo: ''
    }
}

export function fetchTodos() {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then((response) => {

                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then((res) => {
                dispatch(todoFetched(res));
            })
            .catch((e) => {
                console.log(e)
            });
    }
}

export function fetchTodo(id) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(todosFetched(res));
            })
            .catch((e) => console.log(e));
    }
}

export function setTodo(todo) {
    return dispatch => {
        dispatch(todoSet(todo));
    }
}

export function createTodo(todo) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(todoCreated(res));
            })
            .catch((e) => console.log(e));
    }

}

export function updateTodo(todo) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(todoUpdated(todo));
            })
            .catch((e) => console.log(e));
    }

}

export function deleteTodo(todo) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/todos`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo._id),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(todoDeleted(todo));
            })
            .catch((e) => console.log(e));
    }

}