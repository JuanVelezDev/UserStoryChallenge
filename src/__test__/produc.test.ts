// src/__test__/product.service.test.ts
import { Product } from '../models/products.model';
import { ProductService } from '../services/product.service';

// Simulamos (mock) el modelo Sequelize
jest.mock('../models/products.model', () => ({
  Product: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByPk: jest.fn(),
  },
}));

describe('ProductService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should create a new product', async () => {
    const mockData = {
      code: 'NK001',
      name: 'Nike Air Max',
      description: 'Zapatillas deportivas',
      price: 450000,
      stock: 10,
    };

    // Simulamos que el producto no existe y se crea
    (Product.findOne as jest.Mock).mockResolvedValue(null);
    (Product.create as jest.Mock).mockResolvedValue(mockData);

    const result = await ProductService.createProduct(
      mockData.code,
      mockData.name,
      mockData.description,
      mockData.price,
      mockData.stock
    );

    expect(Product.findOne).toHaveBeenCalledWith({ where: { code: mockData.code } });
    expect(Product.create).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  it('should return all products', async () => {
    const mockProducts = [{ id: 1, name: 'Nike Air' }];
    (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

    const result = await ProductService.getAllProducts();

    expect(Product.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });
});
