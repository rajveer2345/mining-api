const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const leaseSchema = mongoose.Schema({
        leaseNo: {
            type: String
        },
        lesseeName: {
            type: String
        },
        mineralName: {
            type: Array
        },
        validity: {
            type: Date
        },
        phone: {
            type: Number
        }
    }, {
        timestamps: true
    }

);

const lease = mongoose.model('lease', leaseSchema);
module.exports = lease;