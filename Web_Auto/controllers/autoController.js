const express = require('express');
const { handle } = require('express/lib/application');
const req = require('express/lib/request');
const { get, render } = require('express/lib/response');
const { Model } = require('mongoose');

var router = express.Router();

const mongoose = require('mongoose');

const Depts = mongoose.model('Depts');
const Comps = mongoose.model('Comps');
const Emps = mongoose.model('Emps');
const Testing = mongoose.model('Testing');
const Lab = mongoose.model('Lab');

router.get('/', (req, res) => {
    res.render("auto/startList", {
        viewTitle: "Start list"
    });
});

// List Products //////////////////////////////////////////////////////////////////
router.get('/listProduct', (req, res) => {
    Comps.find((err, docs) => {
        if (!err) {
            res.render("auto/listProduct", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving products list :' + err);
        }
    }).lean();
});

// List Personal ////////////////////////////////////////////////////////////////////
router.get('/listPersonal', (req, res) => {
    Emps.find((err, docs) => {
        if (!err) {
            res.render("auto/listPersonal", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving personal list :' + err);
        }
    }).lean();
});

// List Depts ///////////////////////////////////////////////////////////////////////
router.get('/listDepts', (req, res) => {
    Depts.find((err, docs) => {
        if (!err) {
            res.render("auto/listDepts", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving depts list :' + err);
        }
    }).lean();
});

// List Lab ///////////////////////////////////////////////////////////////////////
router.get('/EditLab', (req, res) => {
    res.render('auto/Editlab');
})

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
    
});

function insertRecord(req, res){
    var lab = new Lab();
    lab.company = req.body.nameComp;
    lab.name = req.body.nameLab;
    lab.head = req.body.nameHead;
    lab.save((err, doc) => {
        if (!err)
            res.redirect('auto/listLab');
        else {
            if (err.name == 'ValidationError'){
                res.render("auto/Editlab", {
                    viewTitle: "Insert Lab",
                    lab: req.body
                });
            }
            console.log('Error during record insertion: ' + err);
        }
    });
}

function updateRecord(req, res){
    Lab.findOneAndUpdate({ _id: req.body._id }, {$set: {company: req.body.nameComp, name: req.body.nameLab, head: req.body.nameHead}}, { new: true }, (err, doc) => {
        if (!err) { res.redirect('auto/listLab'); }
        else {
            if (err.name == 'ValidationError'){
                res.render("auto/Editlab", {
                    viewTitle: 'Update Article',
                    lab: req.body
                })
            }
            else {
                console.log('Error during record update: ' + err);
            }
        }
    }).lean();
}

router.get('/listLab', (req, res) => {
    Lab.find((err, docs) => {
        if (!err) {
            res.render("auto/listLab", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving lab list :' + err);
        }
    }).lean();
});

router.get('/:id', (req, res) => {
    Lab.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("auto/Editlab", {
                viewTitle: "Update Lab",
                lab: doc
            })
        }
    }).lean();
});

// List Testing ////////////////////////////////////////////////////////////////////
router.get('/listTesting', (req, res) => {
    Testing.find((err, docs) => {
        if (!err) {
            res.render("auto/listTesting", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Testing list :' + err);
        }
    }).lean();
});

///////////////////////////////////////////////////////////////////////////////////////////////////

// Delete Product
router.get('/deleteProd/:id', (req, res) => {
    Comps.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/auto/listProduct');
        }
        else {
            console.log('Error in product delete: ' + err);
        }
    }).lean();
});

// Delete Personal
router.get('/deletePers/:id', (req, res) => {
    Emps.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/auto/listPersonal');
        }
        else {
            console.log('Error in personal delete: ' + err);
        }
    }).lean();
});

// Delete Depts
router.get('/deleteDepts/:id', (req, res) => {
    Comps.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/auto/listDepts');
        }
        else {
            console.log('Error in article delete: ' + err);
        }
    }).lean();
});

// Delete Lab
router.get('/deleteLab/:id', (req, res) => {
    Lab.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/auto/listLab');
        }
        else {
            console.log('Error in lab delete: ' + err);
        }
    }).lean();
});

// Delete Testing
router.get('/deleteTesting/:id', (req, res) => {
    Lab.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/auto/listTesting');
        }
        else {
            console.log('Error in Testing delete: ' + err);
        }
    }).lean();
});

module.exports = router;