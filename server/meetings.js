const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    const dataToSend = getAllFromDatabase('meetings');
    if (!dataToSend){
        res.status(500).send('Server is having issues')
    }
    else{
        res.send(dataToSend);
    }
});

meetingsRouter.post('/', (req, res, next) => {
  let newMeeting = addToDatabase('meetings', createMeeting());
  if (!newMeeting){
    res.status(500).send('Server is having issues');
  }
  else{
    res.status(201).send(newMeeting);
  }
});

meetingsRouter.delete('/', (req, res, next) => {
  const deleteAllMeetings = deleteAllFromDatabase('meetings');
  if (!deleteAllMeetings){
    res.status(500).send('Server is having issues');
  }
  else{
    res.status(204).send(deleteAllMeetings);
  }
});