const { Schema, model } = require('mongoose');
const DoctorSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true

    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true


    },

}, { collection: 'doctors' });

DoctorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})
module.exports = model('Doctor', DoctorSchema);