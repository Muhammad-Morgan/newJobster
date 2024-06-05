const Job = require('../models/job');

const addJob = (req, res) => {
    const {
        position,
        company,
        location,
        status,
        type,
        date
    } = req.body;
    Job.create({
        position,
        company,
        location,
        status,
        type,
        date
    }).then(() => res.json({
        msg: 'Job added',
        type: 'success'
    })).catch(() => res.json({
        msg: 'something went wrong',
        type: 'danger'
    }))
}

const getJob = (req, res) => {
    Job.find().then((result) => res.json({ result })).catch(err => console.log(err))
}
const deleteJob = (req, res) => {
    const { job } = req.query;
    Job.findOneAndDelete({ _id: job }).then(() => {
        Job.find().then((result) => res.json({ result })).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
const getSingleJob = (req, res) => {
    const { job } = req.query;
    Job.findOne({ _id: job }).then((result) => res.json({ result })).catch(err => console.log(err))
}
const editJob = (req, res) => {
    const { _id } = req.query;
    const {
        position,
        company,
        location,
        status,
        type
    } = req.body;
    Job.findByIdAndUpdate(_id, {
        position,
        company,
        location,
        status,
        type
    }).then(() => res.json({ msg: 'updated', type: 'success' })).catch(() => res.json({ msg: 'something is wrong', type: 'danger' }));
}
const getNum = (req, res) => {
    var tempNum = {
        pending: 0,
        interview: 0,
        declined: 0
    };
    Job.find().then((results) => {
        const singleNum = results.filter((item) => item.status === 'pending').length
        tempNum = {
            ...tempNum,
            pending: singleNum
        }
    }).catch(err => console.log(err))
    Job.find().then((results) => {
        const singleNum = results.filter((item) => item.status === 'interview').length
        tempNum = {
            ...tempNum,
            interview: singleNum
        }
    }).catch(err => console.log(err))
    Job.find().then((results) => {
        const singleNum = results.filter((item) => item.status === 'declined').length
        tempNum = {
            ...tempNum,
            declined: singleNum
        }
        if(tempNum.pending !== 0 && tempNum.interview !== 0 && tempNum.declined !== 0){
            res.json({tempNum})
        }
    }).catch(err => console.log(err))
}
module.exports = {
    getNum,
    getJob,
    editJob,
    addJob,
    deleteJob,
    getSingleJob
}