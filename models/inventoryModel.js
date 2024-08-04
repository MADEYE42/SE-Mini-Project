const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true,'Inventory type required'],
        enum:['in','out']
    },
    bloodGroup:{
        type:String,
        requires:[true,'Blood Group required'],
        enum:['O+','O-','AB+','AB-','A+','A-','B+','B-']
    },
    bloodQuantity:{
        type:Number,
        required:[true,"Blood quantity is required"]
    },
    organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'organisation',
        required:[true,'Organisaton is required']
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:function(){
            return this.inventoryType==='out'
        }
    },
    donar:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:function(){
            return this.inventoryType==='in'
        }
    },
    
},{timestamps:true});
module.exports = mongoose.model('Inventory',inventorySchema)