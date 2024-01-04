const express = require('express');
const Logs = require('../models/logs');

const router = express.Router();

//Index
router.get('/',async (req, res) => {
    // res.send("<h1>Index Page</h1>")
    //  res.render('Index');
    try {
        const foundLogs = await Logs.find({});
        res.status(200).render('Index', {logs: foundLogs});
    } catch (err) {
        res.status(400).send(err);
    }
})

//New
router.get('/new', (req, res) => {
    res.render('New')
});

// Delete
router.delete('/:id', async (req, res)=> {
   try{
        const deletedLogs = await Logs.findByIdAndDelete(req.params.id);
        console.log(deletedLogs)
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }

})

//Update
router.put('/:id', async (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }

    try {
        const updatedLogs = await Logs.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        console.log(updatedLogs);
        res.status(200).redirect(`/logs/${req.params.id}`);
    } catch (err) {
    res.status(400).send(err)
}})


//Create
router.post('/',async (req, res) => {
    if(req.body.shipIsBroken === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.shipIsBroken = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false;
    }
    
    try {
        const createdLogs = await Logs.create(req.body);
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }

});

// Edit
router.get('/:id/edit', async (req, res) => {
    try {
        const foundLog = await Logs.findById(req.params.id);
        console.log('foundLog');
        console.log(foundLog)
        res.status(200).render('Edit', {log: foundLog});
    } catch (err) {
        res.status(400).send(err);
    }
})

   
//Show
router.get('/:id',async (req, res) => {
   try {
        const foundLog = await Logs.findById(req.params.id);
        res.render('Show', {log: foundLog});
    } catch (err) {
        res.status(400).send(err);
    }

})

module.exports = router;