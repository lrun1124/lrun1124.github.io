function plusOne(num) {
    num = num + 1;
}
var num = 0;

console.log('调用前num:' + num);
plusOne(num);
console.log('调用后num:' + num);

//output
调用前num:0
调用后num:0

function plusOne(obj) {
    obj.num = obj.num + 1;
}
var obj = {num : 0};
console.log('调用前obj:' + obj);
plusOne(num);
console.log('调用后obj:' + obj);

//output
调用前obj:0
调用后obj:1