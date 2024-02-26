import { Router } from 'express';
import DataController from '../controllers/Data';


const router = Router();

router.get('/', DataController.getAll);
router.post('/', DataController.create);
router.get('/:dataID', DataController.getByID);
router.put('/:dataID', DataController.updateByID);
router.delete('/:dataID', DataController.deleteByID);

export default router;