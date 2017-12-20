/**
 * Created by KienVN on 5/28/2015.
 */

fr.toMoneyString = function(num)
{
    var isNegative = false;
    var formattedNumber = num;
    if(num < 0){
        isNegative = true;
    }
    num = Math.abs(num);
    var hau_to;
    if(num >= 1000000000){
        hau_to = '.';
        formattedNumber = (num/1000000000).toFixed(3);
    } else if (num >= 1000000){
        hau_to = '.';
        formattedNumber = (num/1000000).toFixed(3);
    } else if (num >= 1000){
        hau_to = 'K';
        formattedNumber = (num/1000).toFixed(3);
    } else {
        formattedNumber = num.toString();
    }

    formattedNumber = formattedNumber.replace('.000',hau_to).replace('.00',hau_to).replace('.0',hau_to);
    var indexOfDot = formattedNumber.indexOf('.');
    if(indexOfDot > 0)
    {
        var buff = formattedNumber.substring(indexOfDot + 1);
        if(buff[2] == '0')
        {
            buff = buff.replace(/0/g,'');
            formattedNumber = formattedNumber.substring(0,indexOfDot+1) + buff + hau_to;
        }
        else{
            formattedNumber = formattedNumber.replace('.',hau_to).replace(/00$/,'').replace(/0$/,'');
        }
    }
    if(isNegative)
    {
        formattedNumber = '-' + formattedNumber;
    }
    return formattedNumber;
};

fr.toMoney = function (str) {
    var rStr = str.toString().split("").reverse().join("");
    var result = [];
    for (var i = 0; i < rStr.length; i+= 3) {
        result.push(rStr.substr(i, 3).split("").reverse().join(""));
    }
    return result.reverse().join('.');
}
