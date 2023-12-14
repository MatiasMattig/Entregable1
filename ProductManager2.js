const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //Métodos: 

    async addProduct(nuevoObjeto) {
        let { title, description, price, img, code, stock } = nuevoObjeto;

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El código del producto ya existe");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        this.products.push(newProduct);

        await this.guardarArchivo(this.products);

    }

    getProducts() {
        console.log(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const product = this.products.find(p => p.id === id);

            if (product) {
                return product;
            } else {
                console.error("Producto no encontrado. ID:", id);
                return null;
            }

        } catch (error) {
            console.log("Error al leer el archivo ", error);
        }

    }

    //Nuevos metodos desafio 2: 

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Error al leer un archivo", error);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    //Actualizamos algun producto:
    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("no se encontró el producto");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

}

const manager = new ProductManager("./productos.json");

manager.getProducts();

const fideos = {
    title: "fideos",
    description: "los mas ricos",
    price: 150,
    img: "sin imagen",
    code: "abc123",
    stock: 30
}


manager.addProduct(fideos);

const arroz = {
    title: "arroz",
    description: "el que no se pasa",
    price: 250,
    img: "sin imagen",
    code: "abc124",
    stock: 30
}

manager.addProduct(arroz);

const aceite = {
    title: "aceite",
    description: "esta carisimo",
    price: 15000,
    img: "sin imagen",
    code: "abc125",
    //stock: 30
}

manager.getProducts();

async function testeamosBusquedaPorId() {
    const buscado = await manager.getProductById(2);
    console.log(buscado);
}

testeamosBusquedaPorId();

const salsa = {
    id: 1,
    title: "salsa tomate", 
    description: "los mas ricos", 
    price: 150,
    img: "Sin imagen",
    code: "abc123",
    stock: 30
};

async function testeamosActualizar() {
    await manager.updateProduct(1, salsa);
}

testeamosActualizar();