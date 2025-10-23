import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';

jest.mock('../services/product.service');

describe('ProductController', () => {
  afterEach(() => jest.clearAllMocks());

  it('should create a product successfully', async () => {
    const mockReq = { body: { code: 'NK001', name: 'Nike Air', description: 'Zapato', price: 100, stock: 5 } };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockProduct = { id: 1, ...mockReq.body };

    (ProductService.createProduct as jest.Mock).mockResolvedValue(mockProduct);

    await ProductController.createProduct(mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should handle errors on creation', async () => {
    const mockReq = { body: {} };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    (ProductService.createProduct as jest.Mock).mockRejectedValue(new Error('Error'));

    await ProductController.createProduct(mockReq as any, mockRes as any);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error' });
  });
});
