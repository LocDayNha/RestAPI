var express = require('express');
var router = express.Router();
var categoryModel = require("../model/category");

//localhost:3000/category/add
/**
 * @swagger
 * '/category/add':
 *   post:
 *     tags:
 *     - Category
 *     summary: Thêm Loại sản phẩm
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: ''
 *     responses:
 *       200:
 *         description: Thêm Loại sản phẩm thành công !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400: 
 *         description: Thêm Loại sản phẩm thất bại !
 */

router.post('/add', async function (req, res, next) {
    try {
        const { name } = req.body;
        const addNew = { name };
        await categoryModel.create(addNew);
        res.json(addNew)
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/category/get
/**
 * @swagger
 * '/category/get':
 *   get:
 *     tags:
 *     - Category
 *     summary: Lấy danh sách loại sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách loại sản phẩm thành công !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400: 
 *         description: Trả về danh sách loại sản phẩm thất bại !
 */

router.get('/get', async function (req, res, next) {
    try {
        const list = await categoryModel.find();
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/category/editById
/**
 * @swagger
 * '/category/editById':
 *   post:
 *     tags:
 *     - Category
 *     summary: Sửa Loại sản phẩm
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *            properties:
 *              id:
 *                type: objectId
 *                default: ''
 *              name:
 *                type: string
 *                default: ''
 *     responses:
 *       200:
 *         description: Sửa Loại sản phẩm thành công !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400: 
 *         description: Sửa Loại sản phẩm thất bại !
 */

router.post('/editById', async function (req, res, next) {
    try {
        const { id, name } = req.body;
        const itemEdit = await categoryModel.findById(id);
        if (itemEdit) {
            itemEdit.name = name ? name : itemEdit.name;
            await itemEdit.save();
            res.status(200).json({ "status": true, "message": "Thanh Cong" });
        } else {
            res.status(400).json({ "status": false, "message": "That Bai" });
        }
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/category/deleteById?id=
/**
 * @swagger
 * '/category/deleteById/{id}':
 *   delete:
 *     tags:
 *     - Category
 *     summary: Xóa loại sản phẩm theo ID
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the Category
 *        required: true
 *     responses:
 *       200:
 *         description: Xóa loại sản phẩm theo ID thành công !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400: 
 *         description: Xóa loại sản phẩm theo ID thất bại !
 */

router.delete('/deleteById/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).json({ "status": true, "message": "Thanh Cong" });
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

module.exports = router;
