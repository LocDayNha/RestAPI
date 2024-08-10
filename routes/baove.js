var express = require('express');
var router = express.Router();
var baoveModel = require("../model/baove");

//localhost:3000/baove/add
router.post('/add', async function (req, res, next) {
    try {
        const { name, yearofbirth, competition } = req.body;
        if (Number.isInteger(yearofbirth) || yearofbirth > 0) {
            const competition2 = competition || "Đang cập nhật";
            const addNew = { name, yearofbirth, competition: competition2 };
            await baoveModel.create(addNew);
            res.status(200).json({ "status": true, "message": "Them Moi Thanh Cong" });
        } else {
            return res.status(400).json({ "status": false, "message": "Năm sinh phải là số nguyên dương" });
        }

    } catch (error) {
        res.status(400).json({ "status": false, "message": "Them Moi That Bai" });
    }
});

//localhost:3000/baove/list?year=
router.get('/list', async function (req, res, next) {
    try {
        const { year } = req.query;
        const list = await baoveModel.find({ yearofbirth:  { $lte: year } });
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

module.exports = router;
