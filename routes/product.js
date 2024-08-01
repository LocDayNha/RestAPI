var express = require('express');
var router = express.Router();
var productModel = require("../model/product");
var categoryModel = require("../model/category");
var upload = require("./upload");
var sendMail = require("./mail");

//localhost:3000/product/addNew
/**
 * @swagger
 * '/product/addNew':
 *   post:
 *     tags:
 *     - Product
 *     summary: Thêm sản phẩm mới
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - price
 *              - quantity
 *              - image
 *              - category
 *            properties:
 *              name:
 *                type: string
 *                default: ''
 *              price:
 *                type: number
 *                default: ''
 *              quantity:
 *                type: string
 *                default: ''
 *              image:
 *                type: string
 *                default: ''
 *              category:
 *                type: objectId
 *                default: ''
 *     responses:
 *       200:
 *         description: Thêm sản phẩm mới thành công !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400: 
 *         description: Thêm sản phẩm mới thất bại !
 */

router.post('/addNew', async function (req, res, next) {
    try {
        const { name, price, quantity, image, category } = req.body;
        const addNew = { name, price, quantity, image, category };
        await productModel.create(addNew);
        res.status(200).json({ "status": true, "message": "Thanh Cong" });
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/get
/**
 * @swagger
 * /product/get:
 *   get:
 *     tags:
 *     - Product
 *     summary: Lấy danh sách sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm Thanh Cong
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400: 
 *         description: Trả về danh sách sản phẩm That Bai
 */

router.get('/get', async function (req, res, next) {
    try {
        const list = await productModel.find().populate('category');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/getById/
/**
 * @swagger
 * '/product/getById/{id}':
 *   get:
 *     tags:
 *     - Product
 *     summary: Tìm sản phẩm theo ID
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the product
 *        required: true
 *     responses:
 *       200:
 *         description: Tìm sản phẩm theo ID thành công !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400: 
 *         description: Tìm sản phẩm theo ID thất bại !
 */

router.get('/getById/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const list = await productModel.findById(id).populate('category');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/getNameandPrice
/**
 * @swagger
 * /product/getNameandPrice:
 *   get:
 *     tags:
 *     - Product
 *     summary: Tên và Giá sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm Thanh Cong
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400: 
 *         description: Trả về danh sách sản phẩm That Bai
 */

router.get('/getNameandPrice', async function (req, res, next) {
    try {
        const list = await productModel.find({}, 'name price');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/getByPrice
router.get('/getByPrice', async function (req, res, next) {
    try {
        const list = await productModel.find({ price: { $gt: 1000 } }).populate('category');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/getByCategory?id=
router.get('/getByCategory', async function (req, res, next) {
    try {
        const category = await categoryModel.findOne({ category: req.query.category });
        if (!category) {
            return res.status(400).json({ "status": false, "message": "Danh mục không tồn tại" });
        }
        const list = await productModel.find({ category: category._id }).populate('category');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/count
router.get('/count', async function (req, res, next) {
    try {
        const list = await productModel.countDocuments();
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/quantity
router.get('/quantity', async function (req, res, next) {
    try {
        const list = await productModel.find({ quantity: { $lt: 10 } }).populate('category');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/editPrice?id=
router.post('/editPrice', async function (req, res, next) {
    try {
        const { id } = req.query;
        const { price } = req.body;
        const itemEdit = await productModel.findById(id);
        if (itemEdit) {
            itemEdit.price = price ? price : itemEdit.price;
            await itemEdit.save();
            res.status(200).json({ "status": true, "message": "Thanh Cong" });
        } else {
            res.status(400).json({ "status": false, "message": "That Bai" });
        }
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/deleteById?id=
router.delete('/deleteById', async function (req, res, next) {
    try {
        const { id } = req.query;
        const itemEdit = await productModel.findByIdAndDelete(id);
        res.status(200).json({ "status": true, "message": "Thanh Cong" });
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/getByPrice2
router.get('/getByPrice2', async function (req, res, next) {
    try {
        const list = await productModel.find({ $and: [{ price: { $gte: 5000 } }, { price: { $lte: 15000 } }] }).populate('category');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/nameandquantity
router.get('/nameandquantity', async function (req, res, next) {
    try {
        const list = await productModel.find({ quantity: { $gt: 20 } }, 'name quantity');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/getByName
router.get('/getByName', async function (req, res, next) {
    try {
        const list = await productModel.find({ name: 'Banana' }).populate('category');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/getMaxPrice
router.get('/getMaxPrice', async function (req, res, next) {
    try {
        const list = await productModel.find().populate('category').sort({ price: -1 }).limit(1);
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/getMinPrice
router.get('/getMinPrice', async function (req, res, next) {
    try {
        const list = await productModel.find().populate('category').sort({ price: 1 }).limit(1);
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/tb
router.get('/tb', async function (req, res, next) {
    try {
        const result = await productModel.aggregate([{ $group: { _id: null, tb: { $avg: "$price" } } }]);
        if (result.length > 0) {
            res.status(200).json({ tb: result[0].tb });
        } else {
            res.status(200).json({ tb: 0 });
        }
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/sum
router.get('/sum', async function (req, res, next) {
    try {
        const result = await productModel.aggregate([{ $group: { _id: null, TongGia: { $sum: { $multiply: ["$price", "$quantity"] } } } }]);
        if (result.length > 0) {
            res.status(200).json({ TongGia: result[0].TongGia });
        } else {
            res.status(200).json({ TongGia: 0 });
        }
    } catch (error) {
        res.status(400).json({ "status": false, "message": "That Bai" });
    }
});

//localhost:3000/product/upload
router.post('/upload', [upload.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            return res.json({ status: 0, link: "" });
        } else {
            const url = `http://localhost:3000/images/${file.filename}`;
            return res.json({ status: 1, url: url });
        }
    } catch (error) {
        console.log('Upload image error: ', error);
        return res.json({ status: 0, link: "" });
    }
});

//localhost:3000/product/upload2
router.post('/upload2', [upload.array('image', 9)], async (req, res, next) => {
    try {
        const { files } = req;
        if (!files) {
            return res.json({ status: 0, link: [] });
        } else {
            const url = [];
            for (const singleFile of files) {
                url.push(`http://localhost:3000/images/${singleFile.filename}`);
            }
            return res.json({ status: 1, url: url });
        }
    } catch (error) {
        console.log('Upload image error: ', error);
        return res.json({ status: 0, link: [] });
    }
});

//localhost:3000/product/send-mail
router.post("/send-mail", async function (req, res, next) {
    try {
        const { to, name } = req.body;
        const subject = 'Welcome';
        const content = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Thân gửi</p>
                <p>Tôi là <strong>${name}</strong>. Tôi gửi bạn mail này để thông báo rằng gửi Email đã thành công.</p>
                <p>Hy vọng bạn có một ngày làm việc hiệu quả và nhiều niềm vui.</p>
                <p>
                    <img src="https://i.pinimg.com/originals/7b/39/c6/7b39c67abc82d534cc91a3e6c4cd8609.gif" alt="Welcome Image" style="max-width: 50%; height: auto;">
                </p>
                <p>Trân trọng,</p>
                <p>${name}</p>
            </div>
        `;

        const mailOptions = {
            from: "locdaynha <vohoangloc200@.com>", //tenmail <email gui thu>
            to: to, // nguoi nhan
            subject: subject, // tieu de
            html: content // noi dung
        };
        await sendMail.transporter.sendMail(mailOptions);
        res.json({ status: 1, message: "Gửi mail thành công" });
    } catch (err) {
        res.json({ status: 0, message: "Gửi mail thất bại" });
    }
});



module.exports = router;
