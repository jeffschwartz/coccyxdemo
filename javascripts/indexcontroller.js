define(['coccyx', 'newtodoeditorview', 'todoitemslistview', 'mockdb'], function(v, newtodoeditorview, todoItemsListView, mockdb) {
    'use strict';

    var todosListView,
        todosCollection;

    var newToDoItemAdd = function newToDoItemAdd(){
        var $ntdi = this.$('#new-todo-item'),
            todo;
        if($ntdi.val()){
            todo = {todo: $ntdi.val(), done: false};
            // mockdb.addToDo(todo);
            todosCollection.push(todo);
            // redisplayToDos.call(this);
        }else{
            $ntdi.focus();
        }
    };

    var newToDoItemClear = function newToDoItemClear(){
        var $ntdi = this.$('#new-todo-item');
        $ntdi.val('');
        $ntdi.focus();
    };

    var markToDoItem = function markToDoItem(event){
        mockdb.markToDo(getToDoItemId(event));
    };

    var deleteToDoItem = function deleteToDoItem(event){
        var id = parseInt(getToDoItemId(event), 10);
        // mockdb.deleteToDo(id);
        todosCollection.remove({id: id});
        // if(!todosCollection.length){
        //     redisplayToDos.call(this);
        // }
        // redisplayToDos.call(this);
    };

    var editToDoItem = function editToDoItem(){
        alert('editToDoItem');
    };

    var getToDoItemId = function getToDoItemId (event){
        return v.$(event.target).parents('article.todo-item').attr('data-id');
    };

    //Since our view is already attached we only need to call
    //the view's render method, and there is no need to attach
    //its $domTarget to the dom.
    var redisplayToDos = function redisplayToDos(){
        todosListView.render(todosCollection.getData());
        newToDoItemClear.call(this);
    };

    //When responding to a routing request our views will render in a detached state
    //so we need to attach them to the views. When updating the views, such as when
    //user adds a new todo item, the view is already attached to the dom so there isn't
    //any need to attach them. If you do attach them again, such as by calling html($domtarget),
    //your view's event handlers will be removed by jQuery. So that's why when refreshing
    //the views with updated data we call a different routine, in this case redisplayToDos,
    //see above.
    var showIndexPage = function(){
        //Extend the view object and render it.
        var view1 = v.views.extend(newtodoeditorview, {controller: this, events: {'click #new-todo-item-add': newToDoItemAdd, 'click #new-todo-item-clear': newToDoItemClear}});
        v.$('div.new-todo-container').html(view1.render().$domTarget);
        //Extend the user model object
        todosCollection = v.collections.extend().setModels(mockdb.getToDos());
        //Render the view anytime a model is added or removed from the collection.
        todosCollection.handle(v.collections.addEvent, redisplayToDos, this);
        todosCollection.handle(v.collections.removeEvent, redisplayToDos, this);
        //Extend the index view, binding dom events to our callback functions.
        todosListView = v.views.extend(todoItemsListView, {controller: this, events: {'click span.delete-todo': deleteToDoItem, 'click span.edit-todo': editToDoItem, 'click span.mark-todo': markToDoItem}});
        //Call the view's render() method and attach its $domTarget (it is still detached) to the dom.
        v.$('div.todo-list-container').html(todosListView.render(todosCollection.getData()).$domTarget);
    };

    return {
        name: '',
        routes: {
            'get /': showIndexPage
        }
    };

});
