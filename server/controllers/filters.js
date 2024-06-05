const Job = require('../models/job');

const getJobByPosition = (req, res) => {
    const { posi } = req.query;
    Job.find().then((result) => {
        var tempRes = []
        tempRes = result.filter((item) => item.position.includes(posi));
        res.json({ tempRes })
    }).catch(err => console.log(err))
}
const getJobByStatus = (req, res) => {
    const { posi } = req.query;
    if (posi === 'all') return Job.find().then((result) => res.json({ tempRes: result })).catch(err => console.log(err));
    if (!posi) return Job.find().then((result) => res.json({ tempRes: result })).catch(err => console.log(err))
    Job.find().then((result) => {
        var tempRes = []
        tempRes = result.filter((item) => item.status === posi)
        res.json({ tempRes })
    }).catch(err => console.log(err))
}
const getJobByType = (req, res) => {
    const { posi } = req.query;
    if (posi === 'all') return Job.find().then((result) => res.json({ tempRes: result })).catch(err => console.log(err));
    if (!posi) return Job.find().then((result) => res.json({ tempRes: result })).catch(err => console.log(err))
    Job.find().then((result) => {
        var tempRes = []
        tempRes = result.filter((item) => item.type === posi)
        res.json({ tempRes })
    }).catch(err => console.log(err))
}
module.exports = {
    getJobByPosition,
    getJobByStatus,
    getJobByType
}