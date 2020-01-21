var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://ReiYoshinari:test@cluster0-dphmm.mongodb.net/test?retryWrites=true&w=majority')

//Create a schema (like a blueprint)
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved');
// });

//var data = [{item: 'Get milk'}, {item: 'Walk the dog'}, {item: 'Learn some react'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  // get data from mongodb and pass it to veiw
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
  })
});

app.post('/todo',  urlencodedParser, function(req, res){
  // get data from the view and add it to mongodb
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  })
});

app.delete('/todo/:item', function(req, res){
  // delete the requrested item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

};
