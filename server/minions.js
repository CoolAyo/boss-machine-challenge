const express = require('express');

minionsRouter = express.Router();

module.exports = minionsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

  minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.status(404).send();
    }
  });

minionsRouter.get('/', (req,res,next) => {
    const dataToSend = getAllFromDatabase('minions');
    if (!dataToSend){
        res.status(500).send('Server is having issues')
    }
    else{
        res.status(200).send(dataToSend);
    }
});

minionsRouter.post('/', (req,res,next) => {
    const newMinion = addToDatabase('minions', req.body);
    if (!newMinion){
        res.status(500).send('New data has failed to send')
    }
    else{
        res.status(201).send(newMinion);
    }
});

minionsRouter.get('/:minionId', (req,res,next) => {
    if (req.minion){
        res.status(200).send(req.minion);
    }
    else{
      res.status(404).send('New data has failed to send');
    }
});

minionsRouter.put('/:minionId', (req,res,next) => {
    const minionUpdated = updateInstanceInDatabase('minions', req.body);
    if (minionUpdated){
      res.send(minionUpdated);
    }
    else{
      res.status(500).send('New data has failed to send');
        return minionUpdated;
    }
});

minionsRouter.delete('/:minionId', (req,res,next) => {
    const removedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (removedMinion) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((job) => {
      return job.minionId === req.params.minionId;
    });
    res.send(work);
});
  
  minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      const updatedWork = updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
    }
  });
  
  minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const removedJob = deleteFromDatabasebyId('work', req.params.workId);
    if (removedJob) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });

