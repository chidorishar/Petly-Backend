const express = require("express");
const router = express.Router();
const {  ctrlWrapper, validateQueryParams } = require('../../middlewares');
const ctrl = require('../../controllers/notices');
const { getNoticesQueryParam} = require("../../models")

router.get('/:category', validateQueryParams(getNoticesQueryParam), ctrlWrapper(ctrl.getNoticesByCategory));
// створити ендпоінт для отримання оголошень по категоріям 
// router.get('/favorite', authMdw, ctrlWrapper(getFavoriteNoticesCtrl));
// створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
// router.get('/own', authMdw, ctrlWrapper(getOwnNoticesCtrl));
// створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем
router.get('/notice/:id', ctrlWrapper(ctrl.getNoticeById));
// створити ендпоінт для отримання одного оголошення


// router.get('/search', ctrlWrapper(getNoticeByTitleCtrl));
// створити ендпоінт для пошуку оголошеннь по заголовку
// router.post('/new', authMdw, ctrlWrapper(addNoticetCtrl));
// створити ендпоінт для додавання оголошень відповідно до обраної категорії
// router.delete('/own/:id', authMdw, ctrlWrapper(deleteOwnNoticeCtrl));
// створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем 

// router.patch('/favorite/:id', authMdw, ctrlWrapper(addNoticeToFavoriteCtrl)); //?
// створити ендпоінт для додавання оголошення до обраних
// router.delete('/favorite/:id', authMdw, ctrlWrapper(deleteNoticeFromFavoriteCtrl));
// створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних

module.exports = router;
