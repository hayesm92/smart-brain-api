const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'fd66ff56017f47c489debed9af0bb559'
   });

const handleApiCall = (req,res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))

}
const handleImage = (req,res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
          res.json(entries);
      })
      .catch(err => 
        res.status(400).json('unable to get entries'))
        console.log(err);
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}