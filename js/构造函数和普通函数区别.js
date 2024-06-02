function person(name, age){
    var that = {}
    that.name = name
    that.age = age
    that.sex = 'male'
    return that
}
person().sex = 'male'
var stu1 = person('zhang',18)
console.log(stu1)

