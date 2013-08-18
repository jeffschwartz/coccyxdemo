define([], function(){

    'use strict';

    var todos = [
        {todo: 'Buy milk', done: false},
        {todo: 'Pick up package at PO', done: false},
        {todo: 'Bring notes to meeting', done: false}
    ];

    return {
        getToDos: function(){
            return todos;
        },
        getToDosLength: function(){
            return todos.length;
        }
    };

});