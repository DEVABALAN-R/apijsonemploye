const express = require('express');
const router = express();

router.listen(3000, () => {
  console.log("Server is listening on port 3000");})


// CORS HEADERS MIDDLEWARE
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );
 next();
});



// Load in the mongoose models
const { List,Task} = require('./db/models');

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const { mongoose } = require('./db/mongoose');



router.get('/lists',
           (req, res) => 
                        {
                         List.find({}).then
                              (
                                 (lists)=>{res.send(lists);}            
                              );
                        }
          );



router.post('/lists',(req, res) => {
  // We want to create a new list and return the new list document back to the user (which includes the id)
  // The list information (fields) will be passed in via the JSON request body
  let _userId=req.body._userId;
  let name = req.body.name;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let newList = new List({_userId: req.user_id,name,email,mobile});
  newList.save().then((listDoc) => {
      // the full list document is returned (incl. id)
      res.send(listDoc);
  })
});


router.patch('/lists/:id',(req, res) => {
  // We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
  List.findOneAndUpdate({ _userId: req.params.id, _userId: req.user_id }, {
      $set: req.body
  }).then(() => {
      res.send({ 'message': 'updated successfully'});
  });
});


router.delete('/lists/:id',(req, res) => {
  // We want to delete the specified list (document with id in the URL)
  List.findOneAndRemove({
      _userId: req.params.id,
      _userId: req.user_id
  }).then((removedListDoc) => {
      res.send(removedListDoc);

      // delete all the tasks that are in the deleted list
      deleteTasksFromList(removedListDoc._id);
  })
});
