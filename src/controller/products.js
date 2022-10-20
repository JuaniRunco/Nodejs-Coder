const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors')

class ProductsAPI {
	constructor() {
		this.products = [
			{ id: "1", title: 'Computadora', price: 200 },
			{ id: uuidv4(), title: 'Notebook', price: 250 },
			{ id: uuidv4(), title: 'Televisor', price: 300 },
			{ id: uuidv4(), title: 'Heladera', price: 150 },
			{ id: uuidv4(), title: 'Licuadora', price: 170 }
		];
	}

	findId(id) {
		const result = this.products.findIndex(product => product.id == id);
		if (result === -1) throw createError(404, 'Producto no encontrado');

	}

	validateBody(data) {
		if (typeof data.title === 'number' || typeof data.price === 'string') throw createError(400, 'Datos invalidos');
	}

	getAll() {
		return this.products;
	}

	getById(id) {
		this.findId(id);
		const index = this.products.findIndex(product => product.id == id)

		return this.products[index];
	}

	save(data) {
		this.validateBody(data);

		const newProduct = {
			id: uuidv4(),
			title: data.title,
			price: data.price,
		}
		this.products.push(newProduct);

		return newProduct;
	}

	update(id, data) {
		this.findId(id);
		this.validateBody(data);

		const index = this.products.findIndex(product => product.id == id)

		const oldProduct = this.products[index];

		let newProduct;

		if (data.price === undefined || data.price == null || data.price <= 0) {
			newProduct = {
				id: oldProduct.id,
				title: data.title,
				price: oldProduct.price,
			}
			return newProduct;
		} else if (data.title === "" || data.title === undefined || data.title == null || data.title <= 0) {
			newProduct = {
				id: oldProduct.id,
				title: oldProduct.title,
				price: data.price,
			}
			return newProduct;
		} else {
			newProduct = {
				id: oldProduct.id,
				title: data.title,
				price: data.price,
			}
		}

		this.products.splice(index, 1, newProduct);

		return newProduct;
	}

	delete(id) {
		this.findId(id);
		const index = this.products.findIndex(product => product.id == id)
		this.products.splice(index, 1);

		return `Producto con id:${id} eliminado`;
	}

}

const instanciaProductsApi = new ProductsAPI();

module.exports = {
	ProductsController: instanciaProductsApi
}