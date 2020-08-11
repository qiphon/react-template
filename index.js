// 给定一个正整数数列a, 对于其每个区间, 我们都可以计算一个X值;
// X值的定义如下: 对于任意区间, 其X值等于区间内最小的那个数乘上区间内所有数和;
// 现在需要你找出数列a的所有区间中, X值最大的那个区间;
// 如数列a为: 3 1 6 4 5 2; 则X值最大的区间为6, 4, 5, X = 4 * (6+4+5) = 60;

const s = "Let's take LeetCode contest";

/**
 * @param {string} s
 * @return {string}
 */
// var reverseWords = function(s) {
//     let len = s && s.length
//     if(!len) return ''

//     let r = ''
//     let temp = ''
//     for (let i=0; i< len; i++){
//         let p = s[i]
//         if(p === ' '){
//             r += temp + ' '
//             temp = ''
//         }else {
//             temp = p+temp
//         }
//     }
//     return r + temp
// };

var reverseWords = function(s) {
    let len = s && s.length
    if(!len) return ''

    let r = ''
    let temp = ''
    while(len--){
        let p = s[len]
        // temp += n
        if(p === ' '){
            r = ' ' + temp + r
            temp = ''
        }else {
            temp += p
        }
    }
    // for (let i=0; i< len; i++){
    //     let p = s[i]
    // }
    return temp + r
};

console.log(reverseWords(s))