const express = require('express')
const router = express.Router();

const {
    getJob,
    addJob,
    editJob,
    deleteJob,
    getSingleJob,
    getNum
} = require('../controllers/jobs')
const {
    getJobByPosition,
    getJobByStatus,
    getJobByType,
} = require('../controllers/filters')
router.get('/getjob', getJob)
router.get('/getnumber', getNum)
router.get('/getsinglejob', getSingleJob)
router.get('/getjobbyposition', getJobByPosition)
router.get('/getjobbystatus', getJobByStatus)
router.get('/getjobbytype', getJobByType)
router.post('/addjob', addJob)
router.put('/editjob', editJob)
router.delete('/deletejob', deleteJob)

module.exports = router;