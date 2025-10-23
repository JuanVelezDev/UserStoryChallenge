import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Only admin and vendor can create or edit
router.post('/', verifyToken, checkRole(['admin', 'vendedor']), ClientController.createClient);
router.get('/', verifyToken, ClientController.getAllClients);
router.get('/:id', verifyToken, ClientController.getClientById);
router.put('/:id', verifyToken, checkRole(['admin', 'vendedor']), ClientController.updateClient);
router.delete('/:id', verifyToken, checkRole(['admin']), ClientController.deleteClient);

export default router;
