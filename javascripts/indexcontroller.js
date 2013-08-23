define(['coccyx', 'newtodoeditorview', 'todoitemslistview', 'todoscountview', 'todoeditorview', 'mockdb'], function(v, newtodoeditorview, todoItemsListView, todosCountView, todoEditorView, mockdb) {
    'use strict';

    var todosListView,
        todosCollection,
        todosTotalCountView,
        todoEditView,
        todoEditingIndex,
        editMode = false;

    var newToDoItemAdd = function newToDoItemAdd(){
        var $ntdi = this.$('#new-todo-item'),
            todo,
            ntdiValue = $ntdi.val();
        if(editMode){
            cancelEditToDoItem.call(this);
        }
        if(ntdiValue){
            todo = {todo: ntdiValue, done: false};
            mockdb.addToDo(todo);
            todosCollection.push(todo);
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
        todosCollection.remove({id: id});
    };

    var editToDoItem = function editToDoItem(){
        if(!editMode){
            editMode = true;
            todoEditingIndex = parseInt(getToDoItemId(event), 10);
            var $todoItemInputGroup = getToDoItemInputGroup(event);
            var $todoItem = getToDoItem(event);
            var todoItemText = $todoItem.find('input:text').val();
            $todoItemInputGroup.addClass('hidden');
            todoEditView = v.views.extend(todoEditorView,
                {controller: this,
                events: {'click #update-todo': updateToDoItem,
                'click #cancel-update-todo': cancelEditToDoItem}});
            $todoItem.html(todoEditView.render(todoItemText).$domTarget);
        }
    };

    var updateToDoItem = function(event){
        var todoText = v.$(event.target).prevAll('input:text').val();
        var foundModel = todosCollection.find({id: todoEditingIndex});
        foundModel[0].setProperty('todo', todoText);
        editMode = false;
        todoEditView.remove();
    };

    var cancelEditToDoItem = function(){
        editMode = false;
        todoEditView.remove();
        redisplayToDos.call(this);
    };

    var getToDoItemId = function getToDoItemId (event){
        return v.$(event.target).parents('article.todo-item').attr('data-id');
    };

    var getToDoItem = function getToDoItem (event){
        return v.$(event.target).parents('article.todo-item');
    };

    var getToDoItemInputGroup = function getToDoItemInputGroup (event){
        return v.$(event.target).parents('div.input-group');
    };

    //Since our view is already attached we only need to call
    //the view's render method, and there is no need to attach
    //its $domTarget to the dom.
    var redisplayToDos = function redisplayToDos(){
        todosListView.render(todosCollection.getData());
        newToDoItemClear.call(this);
    };

    //Show the total count of todos in the list
    var showToDosCount = function showToDosCount(){
        todosTotalCountView.render(todosCollection.length);
    };

    //When responding to a routing request our views will render in a detached state
    //so we need to attach them to the dom. When updating the views, such as when
    //user adds a new todo item, the view is already attached to the dom so there isn't
    //any need to attach them. If you do attach them again, such as by calling html($domtarget),
    //your view's event handlers will be removed by jQuery. So that's why when refreshing
    //the views with updated data we call a different routine, in this case redisplayToDos,
    //see above.
    var showIndexPage = function(){
        //Extend the view object and render it.
        var view1 = v.views.extend(newtodoeditorview, {controller: this, events: {'click #new-todo-item-add': newToDoItemAdd, 'click #new-todo-item-clear': newToDoItemClear}});
        v.$('div.new-todo-container').html(view1.render().$domTarget);
        //Extend the user model object.
        todosCollection = v.collections.extend().setModels(mockdb.getToDos());
        //Render these view anytime a model is added or removed from the collection.
        todosCollection.handle(v.collections.addEvent, redisplayToDos, this);
        todosCollection.handle(v.collections.removeEvent, redisplayToDos, this);
        todosCollection.handle(v.collections.addEvent, showToDosCount, this);
        todosCollection.handle(v.collections.removeEvent, showToDosCount, this);
        todosCollection.handle(v.models.propertyChangedEventTopic, redisplayToDos, this);
        //Extend the index view, binding dom events to our callback functions.
        todosListView = v.views.extend(todoItemsListView, {controller: this, events: {'click span.delete-todo': deleteToDoItem, 'click span.edit-todo': editToDoItem, 'click span.mark-todo': markToDoItem}});
        //Call the view's render() method and attach its $domTarget (it is still detached) to the dom.
        v.$('div.todos-list').html(todosListView.render(todosCollection.getData()).$domTarget);
        todosTotalCountView = v.views.extend(todosCountView);
        v.$('#todos-count').html(todosTotalCountView.render(todosCollection.length).$domTarget);
    };

    return {
        name: '',
        routes: {
            'get /': showIndexPage
        }
    };

});
