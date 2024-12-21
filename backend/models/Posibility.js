import mongoose from "mongoose";

const posibilitySchema = new mongoose.Schema({
    posibility : {
        type : Boolean ,
        default : false 
    },
    
}, {timestamps : true});

posibilitySchema.pre('save', function (next) {
    this.updatedAt = new Date(this.updatedAt.setHours(0, 0, 0, 0));
    next();
});

export const Posibility = mongoose.model("Posibility" , posibilitySchema);