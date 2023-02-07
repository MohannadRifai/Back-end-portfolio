import express from "express";
import protect from '../middleware/authMiddleware.js'
const router = express.Router();
import{
    getAllQuote,
    enterQuote,
    findAQuote,
    deleteAQuote,
    updateAQuote,
} from '../controllers/quote.js';


router.get("/", getAllQuote);
router.post('/',protect, enterQuote);
router.get('/:id', protect, findAQuote);
router.delete('/:id', protect, deleteAQuote);
router.patch('/:id', protect, updateAQuote);

export default router