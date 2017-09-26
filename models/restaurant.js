var mongodb = require('./db');

function Restaurant(restaurant) {
    this.style = restaurant.style;
    this.name = restaurant.name;
    this.address = restaurant.address;
    this.tel = restaurant.tel;
    this.business_hours = restaurant.business_hours;
    this.average_consumption = restaurant.average_consumption;
    this.coordinate = restaurant.coordinate;
    this.introduction = restaurant.introduction;
    this.tag = restaurant.tag;
    this.image = restaurant.image;
};

module.exports = Restaurant;

////存储用户信息
//User.prototype.save = function (callback) {
//    //要存入数据库的用户文档
//    var restaurant = {
//        style: this.style,
//        name: this.name,
//        address: this.address,
//        business_hours: this.business_hours,
//        average_consumption: this.average_consumption,
//        coordinate: this.coordinate,
//        introduction: this.introduction,
//        tag: this.tag,
//        image: this.image
//    };
//    //打开数据库
//    mongodb.open(function (err, db) {
//        if (err) {
//            return callback(err); //错误，返回 err 信息
//        }
//        //读取 restaurants 集合
//        db.collection('FinishTainanBigTable', function (err, collection) {
//            if (err) {
//                mongodb.close();
//                return callback(err); //错误，返回 err 信息
//            }
//            //将用户数据插入 restaurants 集合
//            collection.insert(restaurant, {
//                safe: true
//            }, function (err, user) {
//                mongodb.close();
//                if (err) {
//                    return callback(err); //错误，返回 err 信息
//                }
//                callback(null, user[0]); //成功！err 为 null，并返回存储后的用户文档
//            });
//        });
//    });
//};

//读取用户信息
Restaurant.get = function (name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err); //错误，返回 err 信息
        }
        //读取 restaurants 集合
        db.collection('FinishTainanBigTable', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err); //错误，返回 err 信息
            }
            //查找用户名（name键）值为 name 一个文档
            collection.findOne({
                name: name
            }, function (err, restaurant) {
                mongodb.close();
                if (err) {
                    return callback(err); //失败！返回 err 信息
                }
                callback(null, restaurant); //成功！返回查询的用户信息
            });
        });
    });
};
