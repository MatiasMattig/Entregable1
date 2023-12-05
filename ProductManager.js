class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
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
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);

        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado. ID:", id);
            return null;
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

const manejadorProducts = new ProductManager();

manejadorProducts.addProduct(
    new Product("Manzana", "Fruta", 50, "imagen1", 1, 23)
);

manejadorProducts.addProduct(
    new Product("Lechuga", "Verdura", 60, "imagen2", 2, 15)
);

manejadorProducts.addProduct(
    new Product("Yogurt", "Lacteo", 70, "imagen3", 3, 10)
);

console.log(manejadorProducts.getProducts());

const productIdToFind = 2;
const foundProduct = manejadorProducts.getProductById(productIdToFind);

if (foundProduct) {
    console.log("Producto encontrado:", foundProduct);
}