const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID;
    
var Depts = mongoose.Schema({
    plots: {
        type: Array,
        required: 'This field is required.'
    },
    company: {
        type: String,
        required: 'This field is required.'
    },
    name: {
        type: String,
        required: 'This field is required.'
    },
    head: {
        type: String,
        required: 'This field is required.'
    }
},
{collection: 'Depts'});

var Comps = mongoose.Schema({
    name: {
        type: String, 
        required: 'This field is required.'
    },
    type: {
        type: String,
        required: 'This field is required.'
    },
    category: {
        type: Date,
        required: 'This field is invalid.'
    },
    shop: [Depts],
    price: {
        type: Number,
        required: 'This field is required.'
    },
    size: {
        type: Number,
        required: 'This field is required.'
    },
    build_date: {
        type: Date,
        default: Date.now
    }
},
{collection: 'Comps'});

var Emps = mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    title: {
        type: String,
        required: 'This field is required.'
    },
    skill: {
        type: Number,
        required: 'This field is required.'
    },
    salary: {
        type: Number,
        required: 'This field is required.'
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    dept: [Depts]
},
{collection: 'Emps'})

var Lab = mongoose.Schema({
    company: {
        type: String,
        required: 'This field is required.'
    },
    name: {
        type: String,
        required: 'This field is required.'
    },
    head: {
        type: String,
        required: 'This field is required.'
    }
},
{collection: 'Lab'})

var Testing = mongoose.Schema({
    name: {
        type: Object,
        required: 'This field is required.'
    },
    testers: [Emps],
    equip: {
        type: Array,
        required: 'This field is required.'
    },
    test_date: {
        type: Date,
        default: Date.now
    },
    lab: [Lab]
},
{collection: 'Testing'})

var Depts = mongoose.model('Depts', Depts);

var Lab = mongoose.model('Lab', Lab);

var Comps = mongoose.model('Comps', Comps);

var Emps = mongoose.model('Emps', Emps);

var Testing = mongoose.model('Testing', Testing);