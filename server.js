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


//***SEARCH CAUSES ERROR ON GET BY ID, DOESNT WORK YET**//
// app.get('/api/todos/search', function search(req, res) {
//   console.log("Search-200");
//   const searchTask = req.query.q;
//   const result = [];

//   todos.forEach(function(obj){
//     if(obj.task == searchTask) result.push(obj);}
//   );
//   console.log(result);

//   res.json(result);

  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
// });

app.get('/api/todos', function index(req, res) {
  console.log("200");
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  console.log("Post-200");
  const newTodo = req.body;
  console.log(newTodo);
  todos.push(newTodo);
  newTodo._id = todos.length;
  res.json(newTodo);

});

app.get('/api/todos/:id', function show(req, res) {
  console.log("GetId-200");
  res.json(todos[req.params.id-1]);
});

app.put('/api/todos/:id', function update(req, res) {
  console.log("Put-200");
  const updateTarget = todos[req.params.id-1];
  updateTarget.task = req.body.task;
  updateTarget.description = req.body.description;
  res.json(updateTarget);
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  const destroyTarget = req.params.id-1;
  res.json(todos[destroyTarget] + "Deleted");
  todos.splice(destroyTarget,1);
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
