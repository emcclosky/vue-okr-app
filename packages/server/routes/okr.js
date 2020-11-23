const express               = require('express');
const okrController         = require('../controllers/okr');
const { authMiddleware }    = require('../middleware/auth');
const router                = express.Router();

router.get('/okrs/okr/:okrId', authMiddleware, okrController.getOkr);

router.get('/okrs', authMiddleware, okrController.getOkrs);

router.post('/okrs/okr', authMiddleware, okrController.postOkr);

router.put('/okrs/okr/:okrId', authMiddleware, okrController.putOkr);

router.delete('/okrs/okr/:okrId', authMiddleware, okrController.deleteOkr);


module.exports = router;