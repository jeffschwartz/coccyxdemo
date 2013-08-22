define([], function(){

    'use strict';

    var id = 0;

    var todos = [
        {todo: 'Buy milk', done: false},
        {todo: 'Pick up package at PO', done: false},
        {todo: 'Bring notes to meeting', done: false}
    ];

    todos.forEach(function(todo){
        todo.id = id++;
    });

    function setId(todo){
        todo.id = id++;
        return todo;
    }

    return {
        getToDos: function(){
            return todos;
        },
        getToDosLength: function(){
            return todos.length;
        },
        addToDo: function(todo){
            todos.push(setId(todo));
        },
        deleteToDo: function(id){
            todos = todos.filter(function(todo){
                return todo.id !== id;
            });
        },
        markToDo: function(index){
            todos[index].done = !todos[index].done;
        }
    };

});