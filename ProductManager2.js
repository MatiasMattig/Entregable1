const fs = require("fs").promises;

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    getProducts() {
        return this.products;
    }

    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(p => p.code === product.code)) {
            console.error("El código del producto ya existe");
            return;
        }

        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(product);

        await this.guardarArchivo(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const product = arrayProductos.find(p => p.id === id);

            if (product) {
                return product;
            } else {
                console.error("Producto no encontrado. ID:", id);
                return null;
            }
        } catch (error) {
            console.error("Error al leer el archivo:", error.mensaje);
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            if (!respuesta) {
                console.error("El contenido del archivo es vacío.");
                return [];
            }
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.error("Error al leer el archivo:", error.message);
            return [];
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                // Utiliza el array actualizado después de la operación splice
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("No se encontró el producto");
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const manejadorProducts = new ProductManager("./productos.json");

manejadorProducts.getProducts();

const fideos = {
    title: "fideos",
    description: "los mas ricos",
    price: 150,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 30
}

manejadorProducts.addProduct(fideos);

const arroz = {
    title: "arroz",
    description: "los menos ricos",
    price: 170,
    thumbnail: "sin imagen",
    code: "abc124",
    stock: 21
}

manejadorProducts.addProduct(arroz);

const aceite = {
    title: "aceite",
    description: "los mas o menos ricos",
    price: 300,
    thumbnail: "sin imagen",
    code: "abc125",
    stock: 23
}

manejadorProducts.addProduct(aceite);

manejadorProducts.getProducts();

async function testeamosBusquedaPorId() {
    const product = await manejadorProducts.getProductById(2);
    console.log(product);
}

testeamosBusquedaPorId();

const salsa = {
    title: "salsa tomate",
    description: "los mas ricos",
    price: 150,
    thumbnail: "sin imagen",
    code: "abc126",
    stock: 34
}

async function testeamosActualizar() {
    await manejadorProducts.updateProduct(1, salsa);
}

testeamosActualizar();