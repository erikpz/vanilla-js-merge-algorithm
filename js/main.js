window.addEventListener('load', () => {
    let lMargin = 20;
    let tMargin = 30;
    let time = 700;
    let ordenado = false;
    //let defaultArray = [1, 7, -1, 5, 2, 6, 9, 11, 11];
    let defaultArray = [1, 7, -1];


    const getArray = () => showArray(defaultArray);

    const deleteAll = () => {
        let container = getElemClass('.animation-zone');
        container.innerHTML = ''
        /* if (container) {
            console.log(container)
            if (container.hasChildNodes()) {
                while (container.childNodes.lenght >= 1) {
                    container.removeChild(container.firstChild);
                }
            }
        } */
    };

    const showArray = (arr) => {
        deleteAll();
        let arrayContainer = createElem('div');
        arrayContainer.classList.add('array-container');
        for (i of arr) {
            let value = createElem('p');
            value.innerHTML = i;
            let element = createElem('div');
            element.classList.add('array-element');
            element.appendChild(value);
            arrayContainer.appendChild(element);
        }
        let animZone = getElemClass('.animation-zone');
        animZone.appendChild(arrayContainer);
        const toCenter = () => {
            arrayContainer.style.left = (animZone.clientWidth / 2) - (arrayContainer.clientWidth / 2) + 'px';
        }
        toCenter();
        window.addEventListener('resize', toCenter);
        return arrayContainer;
    }



    const createSubArray = (arr, from, to) => {
        let container = createElem('div');
        container.classList.add('array-container');
        for (let i = from; i < to; i++) {
            let value = createElem('p');
            value.innerHTML = arr.childNodes[i].firstChild.innerHTML;
            let element = createElem('div');
            element.classList.add('array-element');
            element.appendChild(value);
            container.appendChild(element);
        }
        return container;
    }

    const animateDivi = (half, dir) => {
        return new Promise(resolve => {
            half.animate({
                transform: [
                    `translate(${dir}10px, ${-half.clientHeight - tMargin}px)`,
                    'translate(0, 0)'
                ]
            }, { duration: time, easing: 'ease-in-out' });
            setTimeout(() => {
                resolve();
            }, time);
        })
    }

    const animatePlace = (element, target) => {
        return new Promise(resolve => {
            element.animate({
                transform: [
                    'translate(0, 0)',
                    `translate(
                        ${target.getBoundingClientRect().left - element.getBoundingClientRect().left}px,
                        ${target.getBoundingClientRect().top - element.getBoundingClientRect().top}px
                    )`
                ]
            }, { duration: time, easing: 'ease-in-out' });

            setTimeout(() => {
                target.innerHTML = element.innerHTML
                element.style.opacity = '0';
                target.style.background = "#02457A";
                target.style.color = "#97CADB";
                target.style.boxShadow = `0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
                0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
                0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12),0px 5px 0 #023a68`
                resolve();
            }, time);
        })
    }

    const merge = async (arr1, arr2, target) => {
        let x = 0;
        let y = 0;
        let z = 0;
        while (x < arr1.childNodes.length && y < arr2.childNodes.length) {
            let val1 = parseInt(arr1.childNodes[x].firstChild.innerHTML);
            let val2 = parseInt(arr2.childNodes[y].firstChild.innerHTML);
            if (val1 < val2) {
                await animatePlace(arr1.childNodes[x++], target.childNodes[z++]);
            } else {
                await animatePlace(arr2.childNodes[y++], target.childNodes[z++]);
            }
        }
        while (x < arr1.childNodes.length) {
            await animatePlace(arr1.childNodes[x++], target.childNodes[z++]);
        }
        while (y < arr2.childNodes.length) {
            await animatePlace(arr2.childNodes[y++], target.childNodes[z++]);
        }
    }

    const sort = async (arr) => {
        if (arr.childNodes.length <= 1)
            return;
        let middle = Math.floor(arr.childNodes.length / 2);
        let half1 = createSubArray(arr, 0, middle);
        let half2 = createSubArray(arr, middle, arr.childNodes.length);

        let animZone = getElemClass('.animation-zone');

        animZone.appendChild(half1);
        half1.style.left = `${arr.offsetLeft - lMargin}px`;
        half1.style.top = `${arr.offsetTop + arr.clientHeight + tMargin}px`;

        await animateDivi(half1, '+');

        animZone.appendChild(half2);
        half2.style.left = `${half1.offsetLeft + half1.clientWidth + lMargin * 2}px`;
        half2.style.top = `${half1.offsetTop}px`;

        await animateDivi(half2, '-');

        await sort(half1);
        await sort(half2);

        await merge(half1, half2, arr);
    }

    const unsort = (arr) => {
        return showArray(arr)
    }



















    

    const modal = createElem('div');
    const title = createElem('h1')
    const btnMod = createElem('button');
    const arrInput = createElem('input');
    title.innerHTML = 'Arreglo!!!';
    arrInput.type = 'text'
    arrInput.id = 'arrInput'
    btnMod.id = 'btnMod'
    btnMod.innerHTML = 'Guardar'
    modal.appendChild(title);
    modal.appendChild(arrInput);
    modal.appendChild(btnMod)

    const btnSet = getElem('set')
    btnSet.addEventListener('click', () => {
        swal({
            content: modal,
            button: false
        })
    })

    btnMod.addEventListener('click', () => {
        ordenado = false
        let entrada = convertInput(arrInput.value);
        let zone = getElemClass('.animation-zone');
        let newArr = showArray(entrada)
        zone.innerHTML = ''
        zone.appendChild(newArr)
        if (entrada !== '') {
            defaultArray = entrada
            swal({
                icon: 'success',
                title: 'Entrada válida.',
                text: 'Se ha guardado el arreglo.'
            })
        } else {
            swal({
                icon: 'error',
                title: 'Error!!!',
                text: 'Entrada inválida. Ingresa un arreglo con el siguiente formato: [1,2,3,4,].'
            }).then(() => {
                swal({
                    content: modal,
                    button: false
                })
            })
        }
    })

    const btnSort = getElem('sort');
    btnSort.addEventListener('click', () => {
        if (ordenado) {
            swal({
                icon: 'info',
                title: 'ORDENADO',
                text: 'El arreglo ya está ordenado.'
            })
            return;
        }
        let array = getArray();
        btnSort.disabled = true
        btnSet.disabled = true
        sort(array).then(() => {
            ordenado = true;
            btnSort.disabled = false
            btnSet.disabled = false
        })
    })

    const btn = getElem('unsort');
    btn.addEventListener('click', () => {
        if (!ordenado) {
            swal({
                icon: 'warning',
                title: 'DESORDENADO!!!',
                text: 'El arreglo ya está desordenado.'
            })
            return;
        }
        let sortedArray = getElemClass('.animation-zone').firstChild;
        console.log(sortedArray.childNodes.length)
        let unsorted = [];
        for (let i = sortedArray.childNodes.length - 1; i >= 0; i--){
            unsorted.push(sortedArray.childNodes[i].firstChild.innerHTML)
        }
        console.log(unsorted)
        defaultArray = unsorted
        unsort(unsorted)
        ordenado = false
    })

    if (getElemClass('.animation-zone').firstChild === null) {
        getElemClass('.animation-zone').appendChild(showArray(defaultArray))
    }
});