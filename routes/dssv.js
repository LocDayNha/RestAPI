var express = require('express');
var router = express.Router();

// danh sách
var list = [
    {'id': 1, 'mssv': '20210001', 'name': 'Nguyễn Văn Nam', 'lop': 'MD18401', 'dtb': 8.5},
    {'id': 2, 'mssv': '20210002', 'name': 'Lê Thị Hồng', 'lop': '10B2', 'dtb': 7.2},
    {'id': 3, 'mssv': '20210003', 'name': 'Trần Quang Hải', 'lop': 'MD18401', 'dtb': 9.2},
    {'id': 4, 'mssv': '20210004', 'name': 'Bùi Minh Đức', 'lop': '12D4', 'dtb': 6.8},
    {'id': 5, 'mssv': '20210005', 'name': 'Đặng Thanh Hằng', 'lop': 'MD18401', 'dtb': 5.2},
    {'id': 6, 'mssv': '20210006', 'name': 'Vũ Hoàng Long', 'lop': '10F6', 'dtb': 8.1},
    {'id': 7, 'mssv': '20210007', 'name': 'Hoàng Ngọc Ánh', 'lop': 'MD18401', 'dtb': 6.0},
    {'id': 8, 'mssv': '20210008', 'name': 'Võ Thị Lan', 'lop': '11H8', 'dtb': 6.8},
    {'id': 9, 'mssv': '20210009', 'name': 'Đỗ Anh Tú', 'lop': 'MD18401', 'dtb': 10}
]

// localhost:3000/dssv/list
router.get('/list', function(req, res, next){
    res.json(list);
})

// localhost:3000/dssv/addNew
router.post('/addNew', function(req, res, next){
    const {id, mssv, name, lop, dtb} = req.body;
    var dssv = {id: id, mssv: mssv, name: name, lop: lop, dtb: dtb};
    list.push(dssv);
    res.json(list);
})

// localhost:3000/dssv/edit
router.post('/edit', function(req, res, next){
    const {id, mssv, name, lop, dtb} = req.body;
    var dssv = list.find(p => p.mssv == mssv);
    dssv.name = name;
    dssv.lop = lop;
    dssv.dtb = dtb;

    res.json(list);
})

// localhost:3000/dssv/deletebyMssv
router.delete('/deletebyMssv', function(req, res, next){
    const {mssv} = req.query;
    var dssv = list.findIndex(p => p.mssv == mssv);
    list.splice(dssv, 1);

    res.json(list);
})

// localhost:3000/dssv/detailbyMssv
router.get('/detailbyMssv', function(req, res, next){
    const {mssv} = req.query;
    var dssv = list.find(p => p.mssv == mssv);

    res.json(dssv);
})

// localhost:3000/dssv/getlistbyDtb
router.get('/getlistbyDtb', function(req, res, next){
    const ds = list.filter(p => p.dtb >= 6.5 && p.dtb <= 8.0);
    res.json(ds);
})

// localhost:3000/dssv/getlistbylop
router.get('/getlistbylop', function(req, res, next){
    const ds = list.filter(p => p.lop == 'MD18401' && p.dtb > 9.0);
    res.json(ds);
})

// localhost:3000/dssv/sort1
router.get('/sort1', function(req, res, next){
    const ds = list.sort((a, b) => a.dtb - b.dtb); // sắp xếp tăng dần
    res.json(ds);
})

// localhost:3000/dssv/sort2
router.get('/sort2', function(req, res, next){
    const ds = list.filter(p => p.lop == 'MD18401').sort((a, b) => b.dtb - a.dtb)[0];
    res.json(ds);
})

module.exports = router;
