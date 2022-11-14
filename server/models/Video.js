const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const videoSchema = mongoose.Schema({

    // 오브젝트 아이디만 넣어도 유저에 있는 모든 정보를 불러올수 있다.
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath : {
        type: String,
    },
    catogory: String,
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }

}, {timestamps: true});

const Video = mongoose.model('Video', videoSchema);


module.exports = { Video }