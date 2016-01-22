var React = require('react');
var ReactDOM = require('react-dom');

 var TodoApp = React.createClass({
      getInitialState: function() {
      return {
        items: ["Homework", "Reddit","Feed Myself", "Sleep", "Play Games"],
        task: ""
        }
      },
      deleteItem: function(e){
        var taskIndex = parseInt(e.target.value, 10);
        this.setState(state => {
            state.items.splice(taskIndex, 1);
          return{items: state.items};
        });
      },
      updateItems: function(e) {
        e.preventDefault();
        this.setState({
            items: this.state.items.concat([this.state.task]),
          task: ""
        });
        return {items: this.state.items};
      },
      onChange: function(e){
        this.setState({ task: e.target.value})
      },
      render: function() {
      return (
        <div className="todo">
            <TodoBanner/>
            <TodoList items={this.state.items} deleteItem={this.deleteItem}/>
            <TodoForm updateItems={this.updateItems} onChange={this.onChange} task={this.state.task}/>  
            <FilteredList items={this.state.items}/>
        </div>
      );
      }
    });
     var TodoForm = React.createClass({
   render: function(){
    return (
        <form onSubmit={this.props.updateItems}>
          <input onChange={this.props.onChange} type="text" value={this.props.task}/>
          <input type='submit' value='Add Task'/>
        </form>
    );
   }
   });
    
    var TodoBanner = React.createClass({
      render: function(){
        return (
          <h2>My ToDoList</h2>
        );
      }
    });

    var TodoList = React.createClass({
      render: function(){
      return (
      <div className="to-do-list">
        <ul>
          {this.props.items.map((item, taskIndex) =>
            <li key={taskIndex}>
              {item}
              <button type='delete' onClick={this.props.deleteItem} value={taskIndex} > X </button>
            </li>
          )}
        </ul>
      </div>
        );
      }
    });

    var FilteredList = React.createClass({
      getInitialState: function(){
            return{
        initialItems: this.props.items,
        items: []
            }
        },
        componentWillMount: function(){
            this.setState({items: this.state.initialItems})
        },
     filterList: function(event){
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item){
         return item.toLowerCase().search(
             event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
        },
     render: function(){
        return (
        <div>
          <h2> Search List </h2>
            <div className="filter">
              <input type="text" placeholder="Search" onChange={this.filterList}/>
                <List items={this.state.items}/>
            </div>
        </div>
        );
    }
});

var List = React.createClass({
  render: function(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li className="filter-list">{item}</li>
        })
       }
      </ul>
    )  
  }
});

ReactDOM.render(
<TodoApp/>,
 document.getElementById('example')
 );
