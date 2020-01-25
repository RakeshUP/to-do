import { Router } from 'express';
import { getTodo, addTodo, modifyTodo, deleteTodo } from './controller';

const router = Router();

router.get('/', getTodo);
router.post('/', addTodo);
router.put('/:id', modifyTodo);
router.delete('/:id', deleteTodo);

export default router;

