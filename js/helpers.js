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

const PASO1 = 'Se parte de tener un arreglo de tamaño n desordenado. En caso de que la longitud sea mayor a 1 se divide todo el arreglo en dos partes aproximadamente iguales.';
const PASO2 = 'Se dividen los subarreglos resultantes hasta que los arreglos sean de tamaño uno.';
const PASO3 = 'Posteriormente se comparan los elementos de cada lista y se combinan de una manera ordenada en un solo arreglo. Al tener los subarreglos acomodados únicamente se comparan los extremos de cada arreglo, ya que contienen los valores más pequeños.';
const PASO4 = 'Se combinan los subarrelglos ordenados en un solo arreglo, obteniendo el arreglo original acomodado.';
