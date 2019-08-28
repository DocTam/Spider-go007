/*
* @Author: DocTam
* @Date:   2019-06-12 18:21:09
* @Last Modified by:   DocTam
* @Last Modified time: 2019-08-26 17:09:04
*
* 编写的一些实用函数
*/

'use strict';

/*
 * 不同的颜色标记出来页面中各层的HTML
 * 参考：https://2008winstar.iteye.com/blog/2128290
 * 出处：http://arqex.com/939/learning-much-javascript-one-line-code
 * 开发工具控制台API参考；https://developer.chrome.com/devtools/docs/commandline-api
 * 考察点：
 * 1. 页面元素的选择；
 * 2. 页面元素的遍历（伪数组）；
 * 3. 页面元素的样式操作；
 * 4. 颜色取值操作（随机数、位操作、字符串解析转换数值、指定进制位的字符串表示法）；
 * 5. $(function(){})和window.onload=function(){}的区别；
 */
function markHtmlCss(){
    [].forEach.call(
        // $$("*"), // $$函数是现代浏览器提供的一个命令行API（常用于控制台），它相当于document.querySelectorAll
        document.querySelectorAll('*'),
        function(a) {
            a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
        }
    )
}

/**
 * 验证是否为 URL，验证的情况包括IP，域名（domain），ftp，二级域名，域名中的文件，域名加上端口！用户名等等信息
 * @param {[type]} str_url 待验证字符串
 */
function isUrl(str_url) {
/*
    var strRegex = '/^((https|http|ftp|rtsp|mms)?://)'
        + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
        + '|' // 允许IP和DOMAIN（域名）
        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
        + '[a-z]{2,6})' // first level domain- .com or .museum
        + '(:[0-9]{1,4})?' // 端口- :80
        + '((/?)|' // a slash isn't required if there is no file name
        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$/';
    var re = new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
*/
    var strRegex = /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/;
    if (new RegExp(strRegex).test(str_url)) return true;
    return false;
}

/**
 *
 * 检查某一数值是否在指定的区间范围内
 *
 * 用法示例：inRange(65, 72, 90);
 * 结果显示：true
 *
 * @param  {[int]} min 最小范围
 * @param  {[int]} num 当前数值
 * @param  {[int]} max 最大范围
 * @return {[Boolean]}     [description]
 */
function inRange(min, num, max){
    return num >= min && num <= max ? true : false;
}

/**
 * 以下是初级算法
 * 来源：https://www.w3cschool.cn/codecamp/list?pename=basic_algorithm_scripting_camp
 */

/**
 *
 * 翻转字符串算法
 *
 * 翻转字符串
 * 把字符串转化成数组，再借助数组的reverse方法翻转数组顺序，然后把数组转化成字符串。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
 * 用法示例：reverseString("hello");
 * 结果显示：olleh
 *
 * @param  {[String]} str [description]
 * @return {[String]}     [description]
 */
function reverseString(str) {
    /* 比较笨的方法
    var newStr = '', strArr = str.split('');
    strArr.reverse();
    for(var i = 0, iLength = strArr.length; i < iLength; i++){
        newStr += strArr[i] ;
    }
    return newStr;
    */
    return str.split('').reverse().join('');
}

/**
 *
 * 阶乘算法
 *
 * 计算所提供整数的阶乘。
 * 如果使用字母n代表一个整数，则阶乘是所有小于或等于n的整数的乘积。
 * 阶乘通常简写成 n!
 * 例如: 5! = 1 * 2 * 3 * 4 * 5 = 120
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators
 * 用法示例：factorialize(5);
 * 结果显示：120
 *
 * @param  {[int]} num [description]
 * @return {[int]}     [description]
 */
function factorialize(num) {
    var total = 1;
    for (var i = 1; i <= num; i++) {
        total *= i;
    }
    return total;
}

/**
 *
 * 回文算法
 *
 * 如果给定的字符串是回文，返回true，反之，返回false。
 * palindrome(回文)是指一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样。
 * 注意:您需要删除字符串多余的标点符号和空格，然后把字符串转化成小写来验证此字符串是不是回文。
 * 函数参数的值可以为"racecar"，"RaceCar"和"race CAR"。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
 * 用法示例：palindrome("1 eye for of 1 eye.");
 * 结果显示：false
 *
 * @param  {[String]} str [description]
 * @return {[Boolean]}     [description]
 */
function palindrome(str) {
    var strArr = str.toLowerCase().replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "").split(''),
        leftStr = '',
        rightStr = '';
    for(var i = 0, iLength = strArr.length; i < iLength / 2; i++){
        leftStr += strArr[i];
        rightStr += strArr[iLength - i - 1];
    }
    if(leftStr == rightStr) return true;
    return false;
}

/**
 *
 * 寻找最长的单词算法
 *
 * 返回提供的句子中最长的单词的长度。
 * 返回值应该是一个数字。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
 * 用法示例：findLongestWord("The quick brown fox jumped over the lazy dog");
 * 结果显示：6
 *
 * @param  {[String]} str [description]
 * @return {[int]}     [description]
 */
function findLongestWord(str) {
    /* 比较笨的方法
    var strArr = str.split(' '),
        count = 0;
    for (var i = 0, iLength = strArr.length; i < iLength; i++) {
        count = count < strArr[i].length ? strArr[i].length : count;
    }
    return count;
    */
    return str.split(' ').sort((b, a) => a.length - b.length).shift().length;
}

/**
 *
 * 设置首字母大写算法
 *
 * 返回一个字符串,确保字符串的每个单词首字母都大写，其余部分小写。
 * 像'the'和'of'这样的连接符同理。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * 用法示例：titleCase("HERE IS MY HANDLE HERE IS MY SPOUT");
 * 结果显示：Here Is My Handle Here Is My Spout
 *
 * @param  {[String]} str [description]
 * @return {[String]}     [description]
 */
function titleCase(str) {
    /* 比较笨的方法
    var newStr = '',
        strArr = str.split(' ');
    for(var i = 0, tmpStr = '', iLength = strArr.length; i < iLength; i++){
        tmpStr = strArr[i];
        newStr += tmpStr.substring(0,1).toUpperCase()+ tmpStr.substring(1).toLowerCase() + ' ';
    }
    return newStr.replace(/(\s*$)/g, '');
    */
    var strArr = str.toLowerCase().split(' ');
    strArr.forEach((v, i) => strArr[i] = v.replace(/^[a-z]?/g, v.charAt(0).toUpperCase()));
    return strArr.join(' ');
}

/**
 *
 * 寻找数组中的最大值算法
 *
 * 在右边的大数组中包含了4个小数组，请分别找到每个小数组中的最大值，然后把它们串联起来，形成一个新的数组。
 * 提示：你可以用for循环来迭代数组，并通过arr[i]的方式来访问数组的每个元素。
 * 用法示例：largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]);
 * 结果显示：Here Is My Handle Here Is My Spout
 *
 * @param  {[Array]} arr [description]
 * @return {[Array]}     [description]
 */
function largestOfFour(arr) {
    /* 比较笨的方法
    var newArr = [],
        value = 0;
    for(var i = 0, iLength = arr.length; i < iLength; i++){
        for(var j = 0, jLength = arr[i].length; j < jLength; j++){
            value = value > arr[i][j] ? value : arr[i][j];
        }
        newArr[i] = value;
        value = 0;
    }
    return newArr;
    */

   arr.forEach((v, i) => arr[i] = arr[i].sort((b, a) => a - b).shift());
   return arr;
}

/**
 *
 * 确认末尾字符算法
 *
 * 检查一个字符串(str)是否以指定的字符串(target)结尾。
 * 用法示例：confirmEnding("He has to give me a new name", "name");
 * 结果显示：true
 *
 * @param  {[String]} str    需要检查的字符串
 * @param  {[String]} target 特定字符串的条件
 * @return {[boolean]}        true / false
 */
function confirmEnding(str, target) {
    //return str.charAt(str.length - 1) == target;
    return str.substring(str.length - target.length) == target;
}

/**
 *
 * 重复操作算法
 *
 * 循环拼接一个指定的字符串 num次，如果num是一个负数,则返回一个空字符串。
 * 本函数主要考察：Global String Object
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 * 用法示例：repeat("abc", 4);
 * 结果显示：abcabcabcabc
 *
 * @param  {[String]} str [description]
 * @param  {[int]} num [description]
 * @return {[String]}     [description]
 */
function repeat(str, num) {
    return str = num < 0 ? '' : str.repeat(num);
}

/**
 *
 * 字符串截取算法
 *
 * 如果字符串的长度比给定的参数num长，则把多余的部分用...来表示。
 * 切记，插入到字符串尾部的三个点号也会计入字符串的长度。
 * 然而，如果指定的参数num小于或等于3，则添加的三个点号不会计入字符串的长度。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
 * 用法示例：trunCate("A-tisket a-tasket A green and yellow basket", 11);
 * 结果显示：A-tisket...
 *
 * @param  {[String]} str [description]
 * @param  {[int]} num [description]
 * @return {[String]}     [description]
 */
function trunCate(str, num) {
    // return str = str.length <= num ? str : num <=3 ? str.slice(0, num) + '...' : str.slice(0, num-3) + '...';
    return str.length > num ? str.slice(0, num + (num > 3 ? -3 : 0)) + '...' : str;
}

/**
 *
 * 数组分割算法
 *
 * 把一个数组arr按照指定的数组大小size分割成若干个数组块。
 * 参考：
 * 用法示例：chunk([1,2,3,4],2);
 * 结果显示：[[1,2],[3,4]]
 *
 * @param  {[Array]} arr  [description]
 * @param  {[int]} size [description]
 * @return {[Array]}      [description]
 */
function chunk(arr, size) {
    /* 比较笨的方法
    var newArr = [],
        getArr = function() {
            for (var i = 0, iLength = arr.length / size; i < iLength; i++) {
                newArr[i] = arr.slice(i * size, (i + 1) * size);
            }
            return newArr;
        }
    // return size <= 0 ? arr : arr.length <= size ? arr : getArr();
    return size > 0 && arr.length > size ? getArr() : arr;
    */

    var newArr = [],
        j = arr.length / size;
    arr.forEach((v, i) => i<j ? newArr.push(arr.slice(i*size, (i+1)*size)) : false);
    return size > 0 && arr.length > size ? newArr : arr;
}

/**
 *
 * 数组截断算法
 *
 * 返回一个数组被截断n个元素后还剩余的元素，从索引0开始截断。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/splice
 * 用法示例：slasher([1, 2, 3], 2);
 * 结果显示：[3]
 *
 * @param  {[Array]} arr     [description]
 * @param  {[int]} howMany [description]
 * @return {[Array]}         [description]
 */
function slasher(arr, howMany) {
    arr.splice(0, howMany);
    return arr;
}

/**
 *
 * 数组查询算法
 *
 * 如果数组第一个字符串元素包含了第二个字符串元素的所有字符，则函数返回true。
 * 举例，["hello", "Hello"]应该返回true，因为在忽略大小写的情况下，第二个字符串的所有字符都可以在第一个字符串找到。
 * ["hello", "hey"]应该返回false，因为字符串"hello"并不包含字符"y"。
 * ["Alien", "line"]应该返回true，因为"line"中所有字符都可以在"Alien"找到。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
 * 用法示例：mutation(["Mary", "Aarmy"]);
 * 结果显示：true
 *
 * @param  {[Array]} arr [description]
 * @return {[Boolean]}     [description]
 */
function mutation(arr) {
    var str1 = arr[0].toUpperCase(),
        str2 = arr[arr.length - 1].toUpperCase();
    for (var i = 0, iLength = str2.length; i < iLength; i++) {
        if(str1.indexOf(str2[i],0) === -1) return false
    };
    return true;
}

/**
 *
 * 删除数组中特定值算法
 *
 * 删除数组中的所有的假值。
 * 在JavaScript中，假值有false、null、0、""、undefined 和 NaN。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * 用法示例：bouncer([false, null, 0, NaN, undefined, ""]);
 * 结果显示：[]
 *
 * @param  {[Array]} arr [description]
 * @return {[Array]}     [description]
 */
function bouncer(arr) {
    return arr.filter(word => Boolean(word));
}

/**
 *
 * 去除数组中任意多个值算法
 *
 * 实现一个 destroyer 函数，第一个参数是初始数组，后跟一个或多个参数。从初始数组中删除与这些参数具有相同值的所有元素。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * 用法示例：destroyer([1, 2, 3, 1, 2, 3], 2, 3);
 * 结果显示：[1,1]
 *
 * @param  {[Array]} arr [description]
 * @return {[Array]}     [description]
 */
function destroyer(arr) {
    return arr.filter(word => ! Array.from(arguments).includes(word));
}

/**
 *
 * 数组排序并插入值算法
 *
 * 先给数组排序，然后找到指定的值在数组的位置，最后返回位置对应的索引。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * 用法示例：where([20,3,5], 19);
 * 结果显示：2
 *
 * @param  {[Array]} arr [description]
 * @param  {[int]} num [description]
 * @return {[int]}     [description]
 */
function where(arr, num) {
    // Find my place in this sorted array.
    arr.push(num);
    // arr.sort(function(a, b){return a - b;}); // 等价于下面的箭头函数表达式；
    arr.sort((a, b) => a - b);
    return arr.indexOf(num);
}

/**
 *
 * 位移密码算法
 *
 * 移位密码也就是密码中的字母会按照指定的数量来做移位。
 * 著名的凯撒密码Caesar cipher，又叫移位密码。
 * 一个常见的案例就是ROT13密码，字母会移位13个位置。由'A' ↔ 'N', 'B' ↔'O'，以此类推。
 * 写一个ROT13函数，实现输入加密字符串，输出解密字符串。
 * 所有的字母都是大写，不要转化任何非字母形式的字符(例如：空格，标点符号)，遇到这些特殊字符，就跳过它们。
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
 * 用法示例：rot13("SERR PBQR PNZC");
 * 结果显示：FREE CODE CAMP
 *
 * @param  {[String]} str [description]
 * @return {[String]}     [description]
 */
function rot13(str) {
    function checkRange(num, min, mid, max, shifting) {
        if (num < min || num > max) return 0;
        if (num > mid) return 0 - shifting;
        return shifting;
    }

    var newStr = '';
    for (var i = 0, a = 0, iLength = str.length; i < iLength; i++) {
        a = str.charCodeAt(i);
        newStr += String.fromCharCode(a + checkRange(a, 65, 77, 90, 13));
    };
    return newStr;
}

/**
 * 以下是中级算法
 * 来源：https://www.w3cschool.cn/codecamp/list?pename=intermediate_algorithm_scripting_camp
 */

/**
 *
 * 区间求值算法
 *
 * 我们会传递给你一个包含两个数字的数组。返回这两个数字和它们之间所有数字的和。
 * 最小的数字并非总在最前面。
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 * 用法示例：sumAll([1,5]);
 * 结果显示：15
 *
 * @param  {[Array]} arr [description]
 * @return {[int]}     [description]
 */
function sumAll(arr) {
    return arr.reduce((a,v) => Array(Math.max(a,v)+1).fill(0).map((v,i) => i).slice(Math.min(a,v))).reduce((a,v) => a+v, 0);
}

/**
 *
 * 找出数组间差异算法
 *
 * 比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。换言之，返回两个数组的差异。
 * 参考：
 * 用法示例：diff([1, 2, 3, 5, 6], [1, 2, 3, 4, 5, 9]);
 * 结果显示：15
 *
 * @param  {[Array]} arr1 [description]
 * @param  {[Array]} arr2 [description]
 * @return {[Array]}      [description]
 */
function diff(arr1, arr2) {
    return arr1.filter(v => !new Set(arr2).has(v)).concat(arr2.filter(v => !new Set(arr1).has(v)));
}

/**
 *
 * 数字转罗马数字算法
 *
 * 将给定的数字转换成罗马数字。所有返回的 罗马数字 都应该是大写形式。
 * 参考：https://www.shuxuele.com/roman-numerals.html
 * 用法示例：convertRoman(9527);
 * 结果显示：MMMMMMMMMDXXVII
 *
 * @param  {[int]} num [description]
 * @return {[String]}     [description]
 */
function convertRoman(num) {
    var romanArrs = [
            ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', '个位'],
            ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '十位'],
            ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM','百位'],
            ['', 'M', '千位']
        ],
        romanArr = [],
        numArr = String(num).split('').reverse();
    numArr.forEach((v,i) => i<3 ? romanArr.push(romanArrs[i][v]) : false);
    if(numArr.length > 3) romanArr.push(romanArrs[3][1].repeat(numArr.slice(3).join('')));
    return romanArr.reverse().join('');
}

/**
 *
 * 对象搜索算法
 *
 * 写一个 function方法，它遍历一个对象数组（第一个参数）并返回一个包含相匹配的属性-值对（第二个参数）的所有对象的数组。如果返回的数组中包含 source 对象的属性-值对，那么此对象的每一个属性-值对都必须存在于 collection 的对象中。
 * 例如，如果第一个参数是 [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]，第二个参数是 { last: "Capulet" }，那么你必须从数组（第一个参数）返回其中的第三个对象，因为它包含了作为第二个参数传递的属性-值对。
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 *
 * 用法示例：where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
 * 结果显示：[{ first: "Tybalt", last: "Capulet" }]
 *
 * @param  {[Array]} collection [description]
 * @param  {[Object]} source     [description]
 * @return {[Array]}            [description]
 */
function where(collection, source) {
    const keys = Object.keys(source);
    return collection.filter(o => keys.every(k => o.hasOwnProperty(k) && o[k] == source[k]));
}

/**
 *
 * 字符串查询替换算法
 *
 * 使用给定的参数对字符串执行一次查找和替换，然后返回新字符串。
 * 第一个参数是将要对其执行查找和替换的字符串。
 * 第二个参数是将被替换掉的单词（替换前的单词）。
 * 第三个参数用于替换第二个参数（替换后的单词）。
 * 注意：替换时保持原单词的大小写。例如，如果你想用单词 "dog" 替换单词 "Book" ，你应该替换成 "Dog"。
 * 参考：
 * 用法示例：myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
 * 结果显示：
 *
 * @param  {[String]} str    [description]
 * @param  {[String]} before [description]
 * @param  {[String]} after  [description]
 * @return {[String]}        [description]
 */
function myReplace(str, before, after) {
    var arr = str.split(' '),
        strIndex = arr.indexOf(before);
    if(strIndex == -1) return '参数有误，请检查^_^';
    var getFirstChar = arr[strIndex].charCodeAt(0);
    arr[strIndex] = getFirstChar <= 90 && getFirstChar >= 65 ? after.replace(/^[a-z]?/g, after.charAt(0).toUpperCase()) : after.toLowerCase();
    return arr.join(' ');
}

/**
 *
 * 字符串移动插入算法
 *
 * 把指定的字符串翻译成 pig latin。
 * Pig Latin 把一个英文单词的第一个辅音或辅音丛（consonant cluster）移到词尾，然后加上后缀 "ay"。
 * 如果单词以元音开始，你只需要在词尾添加 "way" 就可以了。
 * 输入字符串保证是英文单词全部小写。
 * 扩展：支持大小写判断，不管变化前后，首字母都统一为大写。
 * 参考：https://en.wikipedia.org/wiki/Pig_Latin
 * 参考：
 * 用法示例：translate("consonant");
 * 结果显示：
 *
 * @param  {[String]} str [description]
 * @return {[String]}     [description]
 */
function translate(str) {
    var arr = [],
        vowelArr = 'AEIOUaeiou'.split(''),
        isUpper = inRange(65, str.charCodeAt(0), 90);
    str = str.toLowerCase();
    if(vowelArr.includes(str.charAt())){
        str += 'way';
    }else{
        str.split('').forEach((v, i) => vowelArr.includes(v) ? arr.push(i) : false);
        str = str.substring(arr[0]) + str.substring(0, arr[0]) + 'ay';
    }
    return isUpper ? str.replace(/^[a-z]?/g, str.charAt().toUpperCase()) : str;
}

// js中级脚本算法参考：https://blog.csdn.net/gaowahaha/article/details/78884909

/**
 *
 * 字符配对算法
 *
 * DNA 链缺少配对的碱基。依据每一个碱基，为其找到配对的碱基，然后将结果作为第二个数组返回。
 * Base pairs（碱基对） 是一对 AT 和 CG，为给定的字母匹配缺失的碱基。
 * 在每一个数组中将给定的字母作为第一个碱基返回。
 * 例如，对于输入的 GCG，相应地返回 [["G", "C"], ["C","G"],["G", "C"]]字母和与之配对的字母在一个数组内，然后所有数组再被组织起来封装进一个数组。
 * 参考；https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * 参考：https://en.wikipedia.org/wiki/Base_pair
 * 用法示例：pair("GCG");
 * 结果显示：
 *
 * @param  {[String]} str [description]
 * @return {[Array]}     [description]
 */
function pair(str) {
    var arr = [],
        jsonObj = {
            A: "T",
            T: "A",
            G: "C",
            C: "G"
        };
    str.split('').forEach((v, i) => arr.push([v, jsonObj[v]]));
    return arr;
}

/**
 * 从传递进来的字母序列中找到缺失的字母并返回它。
 * 如果所有字母都在序列中，返回 undefined。
 * 参考：
 * 用法示例：fearNotLetter("abce");
 * 结果显示：d
 *
 * @param  {[String]} str [description]
 * @return {[String]}     [description]
 */
function fearNotLetter(str) {
    for (var i = 0, m, n ,iLength = str.length; i < iLength - 1; i++) {
        m = str.charAt(i).charCodeAt() + 1;
        n = str.charAt(i + 1).charCodeAt();
        if(m != n) return String.fromCharCode(m);
    }
    return undefined;
}

/**
 *
 * 输入检查算法
 *
 * 检查一个值是否是基本布尔类型，并返回 true 或 false。
 * 基本布尔类型即 true 和 false。
 * 参考：typeof
 * 用法示例：boo(null);
 * 结果显示：false
 *
 * @param  {[type]} bool [description]
 * @return {[type]}      [description]
 */
function boo(bool) {
    return typeof bool === 'boolean' ? true : false;
}

/**
 *
 * 数组去重算法
 *
 * 写一个 function，传入两个或两个以上的数组，返回一个以给定的原始数组排序的不包含重复值的新数组。
 * 换句话说，所有数组中的所有值都应该以原始顺序被包含在内，但是在最终的数组中不包含重复值。
 * 非重复的数字应该以它们原始的顺序排序，但最终的数组不应该以数字顺序排序。
 * 参考：
 * 用法示例：unite([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]);
 * 结果显示：[1, 2, 3, 5, 4, 6, 7, 8]
 *
 * @return {[Array]}      [description]
 * @Author: DocTam
 * @Date:   2019-06-23 23:00:09
 */
function unite() {

    /* // 传统方法
    var len = arguments.length;
    var itemdemo = arguments[0];
    for (var i = 1; i < len; i++) {
        arguments[i] = arguments[i].filter(function(item) {
            return itemdemo.indexOf(item) < 0;
        });
        itemdemo = itemdemo.concat(arguments[i]);
    }
    return itemdemo;
    */

    /* // 普通方法
    return Array.from([].concat.apply([], arguments)).reduce((a, v) => {a.includes(v) ? false : a.push(v); return a;}, []);
    */

    /* // 普通方法改进条件判断
    return Array.from([].concat.apply([], arguments)).reduce((a, v) => {!a.includes(v) && a.push(v); return a;}, []);
    */

    /* // 高级方法
    return Array.from(new Set(Array.from([].concat.apply([], arguments))));
    */

    // 高级方法改进数组对象
    return Array.from(new Set([].concat.apply([], arguments)));
}

/**
 *
 * html符号转实体算法
 *
 * 为了保证页面输出安全，需要对一些特殊的字符进行转义，如：将<, >, &, ", '进行转义
 * 参考：https://www.w3cschool.cn/html/html-entities.html
 * 参考：https://www.w3cschool.cn/javascript/js-obj-regexp.html
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
 * 用法示例：convertHtml("<p>this is A&B "+'"'+" C "+'"'+"</p>");
 * 结果显示：&lt;p&gt;this is A&amp;B &quot; C &quot;&lt;/p&gt;
 *
 * @param  {[String]} str 一些需要进行转义的特殊字符
 * @return {[String]}     转义后的特殊字符
 */
function convertHtml(str) {
    return str.replace(
        /[<>"&']/g,
        function(match) {
            switch (match) {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case "\"":
                    return "&quot;";
                case "\'":
                    return "&​apos;";
            }
        }
    );
}

/**
 *
 * 字符串连接算法
 *
 * 将字符串转换为 spinal case。Spinal case 是 all-lowercase-words-joined-by-dashes 这种形式的，也就是以连字符连接所有小写单词。
 * 参考：
 * 用法示例：spinalCase("thisIs_Spinal Tap");
 * 结果显示：this-is-spinal-tap
 *
 * @param  {[String]} str [description]
 * @return {[String]}     [description]
 */
function spinalCase(str) {
    return str.replace(/[_\s]/g, '-').replace(/(\B[A-Z])/g, '-$1').toLowerCase();
}

/**
 * 给一个正整数num，返回小于或等于num的斐波纳契奇数之和。
 * 斐波纳契序列中的前两个数字是1和1.序列中的每个附加数字是前面两个数字的和。斐波纳契序列的前六个数字是1,1,2,3,5和8。
 * 例如，sumFibs(4)应该返回 5，因为斐波纳契数列中所有小于4的奇数是 1、1、3。
 * 提示：此题不能用递归来实现斐波纳契数列。因为当num较大时，内存会溢出，推荐用数组来实现。
 * 参考：
 * 用法示例：sumFibs(4);
 * 结果显示：5
 *
 * @param  {[int]} num [description]
 * @return {[int]}     [description]
 */
function sumFibs(num) {
    var a = 1, b = 1, c = 0, sum = a + b;
    function getSum(){
        while(num >= c){
            console.log("a : " + a + ", b : " + b + ", c : " + c + ", sum : " + sum + "\n");
            if(c%2 != 0) sum += c;
            c = a + b;
            a = b;
            b = c;
        }
        return sum;
    }
    return num < 3 ? num : getSum();
}

