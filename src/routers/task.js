const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.get('/test', (req,res)=> {
    res.send('From a new file')
})

router.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.send('Task has been added successfully').status(201)
    }catch(e){
        res.send(e).status(400)
    }
})


router.get('/tasks', async (req,res)=>{
    try{
    const tasks = await Task.find({})
    res.send(tasks)
    } catch(e){
        res.status(400).send(e)
    }

})

router.get('/tasks/:id/', async (req,res)=>{
    try{
    const task = await Task.findById(req.params.id)
    res.send(task.description).status(200)
    }catch(e){
        res.send(e).status(400)
    }

})


router.patch('/tasks/:id/', async (req,res)=> {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((updates)=> allowedUpdates.includes(updates))

    if(!isValidOperation){
        return res.status(410).send({'error': 'Parameters not valid'})
    }

    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()


        if(!task){
            return res.status(404).send({'error':'There is no task matching'})
        }

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id/', async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send({'error':'No task found'})
        }

        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router