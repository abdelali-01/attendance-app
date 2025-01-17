import mongoose from 'mongoose' ;

const authSchema = new mongoose.Schema({
    email : {
        type : String ,
        require : true ,
        unique : true
    },
    password : {
        type : String ,
        require : true
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        required: true
    },
});


export const Auth = mongoose.model("Auth" , authSchema);