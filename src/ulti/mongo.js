//chuyển mảng document Mongoose thành mảng plain objects để dùng trong templates/JSON

module.exports = {
    //cho  1 array (dạng như hiển thị 1 dãy lựa chọn khóa học )
    multipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map((mongoose) => mongoose.toObject());
    },
    //cho 1 document và hiển thị nội dung chi tiết của doc đấy
    mongooseToObject: function (mongooseDoc) {
        return mongooseDoc ? mongooseDoc.toObject() : mongooseDoc;
    },
};
