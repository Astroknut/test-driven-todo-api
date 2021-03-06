// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

var counterI = 3;

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

 app.get('/api/todos/search', function search(req, res) {
   console.log("Search-200");
  for (var i=0; i<todos.length; i++) {
    if(todos[i].task == req.query.q){
     res.json(todos[i]);
    }
  }
 });

app.get('/api/todos', function index(req, res) {
  console.log("200");
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  console.log("Post-200");
  const newTodo = req.body;
  console.log(newTodo);
  todos.push(newTodo);
  newTodo._id = counterI;
  counterI++;
  res.json(newTodo);

});

app.get('/api/todos/:id', function show(req, res) {
  console.log("GetId-200");
  for (var i = 0; i < todos.length; i++) {
    if(todos[i]._id == req.params.id){
      res.json(todos[i]);
    } 
  } 
});

app.put('/api/todos/:id', function update(req, res) {
  console.log("Put-200");
  for (var l=0; l<todos.length; l++){
    if(todos[l]._id == req.params.id) {
      todos[l].task = req.body.task;
      todos[l].description = req.body.description;
      res.json(todos[l]);
    }
  }
  });
  
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */


app.delete('/api/todos/:id', function destroy(req, res) {
  for (var i=todos.length-1; i>=0; i--){
    if(todos[i]._id == req.params.id){
      var target = todos[i];
      res.json(target);
      todos.splice(i, 1);
      break;
    }
  }

  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
