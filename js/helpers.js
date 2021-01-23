const getElem = (id) => document.getElementById(id);
const getElemClass = (cls) => document.querySelector(cls);
const createElem = (elem) => document.createElement(elem)
const convertInput = (str) => {
    let strn
    try{
        strn = JSON.parse(str.replace(/\s/g, ''));
    }catch{
        strn = ''
    }
    return strn
}