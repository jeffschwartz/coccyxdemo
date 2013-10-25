(function(w, tdd, v){

    'use strict';

    tdd = w.tdd = tdd ? tdd : {};

    var todosListView,
        todosCollection,
        todoEditView,
        todoEditingIndex,
        navView,
        editMode = false,
        filter = 0, // 0 = active, 1 = all, 2 = completed.
        filteredData;

    var newToDoItemAdd = function newToDoItemAdd(){
        var $ntdi = this.$('#new-todo-item'),
            todo,
            ntdiValue = $ntdi.val();
        if(editMode){
            cancelEditToDoItem.call(this);
        }
        if(ntdiValue){
            todo = {todo: ntdiValue, done: false};
            tdd.mockDb.addToDo(todo);
            todosCollection.push(todo);
            setTabs();
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
        var id = parseInt(getToDoItemId(event), 10);
        var found = todosCollection.find({id: id});
        found[0].setProperty('done', !found[0].getProperty('done'));
    };

    var deleteToDoItem = function deleteToDoItem(event){
        var id = parseInt(getToDoItemId(event), 10);
        todosCollection.remove({id: id});
    };

    var editToDoItem = function editToDoItem(event){
        if(!editMode){
            editMode = true;
            todoEditingIndex = parseInt(getToDoItemId(event), 10);
            var $todoItemInputGroup = getToDoItemInputGroup(event);
            var $todoItem = getToDoItem(event);
            var todoItemText = $todoItem.find('input:text').val();
            $todoItemInputGroup.addClass('hidden');
            todoEditView = v.views.extend(tdd.todoEditorView,
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

    var getData = function(){
        filteredData = todosCollection.getData();
        if(filter === 2){
            filteredData = filteredData.filter(function(todo){
                return todo.done;
            });
        }else if(filter === 0){
            filteredData = filteredData.filter(function(todo){
                return !todo.done;
            });
        }
        return filteredData;
    };

    var setTabs = function(){
        var $navTabs = v.$('ul.nav-tabs');
        $navTabs.children('li').removeClass('active').end().children('li:eq(' + filter + ')').addClass('active');
    };

    var showActive = function(){
        filter = 0;
        redisplayToDos.call(this);
        setTabs();
    };

    var showAll = function(){
        filter = 1;
        redisplayToDos.call(this);
        setTabs();
    };

    var showCompleted = function(){
        filter = 2;
        redisplayToDos.call(this);
        setTabs();
    };

    //Since our view is already attached we only need to call
    //the view's render method, and there is no need to attach
    //its $domTarget to the dom.
    var redisplayToDos = function redisplayToDos(){
        navView.render(todosCollection.getData());
        todosListView.render(getData());
        newToDoItemClear.call(this);
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
        var view1 = v.views.extend(tdd.newTodoEditorView, {
            controller: this,
            events: {
                'click #new-todo-item-add': newToDoItemAdd,
                'click #new-todo-item-clear': newToDoItemClear
            }
        });
        v.$('div.new-todo-container').html(view1.render().$domTarget);
        //Extend the user model object.
        todosCollection = v.collections.extend().setModels(tdd.mockDb.getToDos());
        //Render these view anytime a model is added or removed from the collection.
        todosCollection.handle(v.collections.addEvent, redisplayToDos, this);
        todosCollection.handle(v.collections.removeEvent, redisplayToDos, this);
        todosCollection.handle(v.models.propertyChangedEvent, redisplayToDos, this);
        //Extend the nav view.
        navView = v.views.extend(tdd.navView);
        //Render the nav view.
        v.$('div.nav-container').html(navView.render(todosCollection.getData()).$domTarget);
        //Extend the index view, binding dom events to our callback functions.
        todosListView = v.views.extend(tdd.todoItemsListView, {
            controller: this,
            events: {
                'click span.delete-todo': deleteToDoItem,
                'click span.edit-todo': editToDoItem,
                'click span.mark-todo': markToDoItem
            }
        });
        //Call the view's render() method and attach its $domTarget (it is still detached) to the dom.
        v.$('div.todos-list').html(todosListView.render(getData()).$domTarget);
    };

    tdd.indexController = {
        name: '',
        routes: {
            'get /': showIndexPage,
            'get active': showActive,
            'get all': showAll,
            'get completed': showCompleted
        }
    };

}(window, window.tdd, window.Coccyx));
