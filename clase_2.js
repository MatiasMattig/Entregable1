// hacer un nuevo array con todos los objetos juntos 
// y que no se repita dos veces ningun objeto
// obtener el total de productos (todos juntos)

//Array con los objetos

const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

//creamos el array donde apareceran todos los productos juntos

const productos = [];

//obtenemos las keys de cada producto (la key seria el nombre en este caso)
// y las guardamos en keys

objetos.forEach((objeto) => {
    const keys = Object.keys(objeto);

	//aca recorremos el array keys y si un productos no esta en el lo pusheamos al array productos

    keys.forEach((key) => {
        if (!productos.includes(key)) {
            productos.push(key);
        }
    });
});

console.log(productos);

// esat es la segunda parte donde obtenemos la cantidad total de productos

// totalVendidos empieza en 0
let totalVendidos = 0;

//obtenemos los valores de cada producto con el entries
objetos.forEach((objeto) => {
    let keyValues = Object.entries(objeto);

	// iteramos en keyValues y con el prod0 que seria el nombre del producto
	// nos fijamos si esta el producto y si esta con lo de abajo de prod1 que seria el value (el numero)
	// lo sumamos en totalVendidos

    keyValues.forEach(prod => {
		if(productos.includes(prod[0])) {
			totalVendidos += prod[1];
		}
	});
});

console.log(totalVendidos);