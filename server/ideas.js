const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

  const millionDollar = require('./checkMillionDollarIdea');

  
  ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
  });
  
  ideasRouter.post('/', millionDollar, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
  });
  
  ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
  });
  
  ideasRouter.put('/:id', millionDollar, (req, res, next) => {
    let updatedInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedInstance);
  });
  
  ideasRouter.delete('/:id', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.id);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });