const express = require('express');
const router = express.Router();
const {
  ctrlWrapper,
  validateQueryParams,
  userValidation,
  validateBody,
  uploadImageToCloudinary,
} = require('../../middlewares');
const ctrl = require('../../controllers/notices');
const { noticesQueryParam, newNoticeSchema } = require('../../models');
const { upload } = require('../../services');

// NEW/COMMON
// створити ендпоінт для додавання оголошень відповідно до обраної категорії
router.post(
  '/new',
  userValidation,
  upload.single('image'),
  validateBody(newNoticeSchema),
  uploadImageToCloudinary,
  ctrlWrapper(ctrl.addNotice)
);

// створити ендпоінт для отримання одного оголошення
router.get('/notice/:id', ctrlWrapper(ctrl.getNoticeById));

// створити ендпоінт для пошуку оголошеннь по заголовку
// створити ендпоінт для отримання оголошень по категоріям
router.get(
  '/category/:category',
  validateQueryParams(noticesQueryParam),
  ctrlWrapper(ctrl.getNoticesByCategoryAndSearchQuery)
);

// OWN
// створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем
router.get(
  '/own',
  userValidation,
  validateQueryParams(noticesQueryParam),
  ctrlWrapper(ctrl.getOwnNotices)
);

// створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем
router.delete('/own/:id', userValidation, ctrlWrapper(ctrl.deleteOwnNotice));

// FAVORITES
// створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
router.get(
  '/favorites',
  userValidation,
  validateQueryParams(noticesQueryParam),
  ctrlWrapper(ctrl.getFavoriteNotices)
);

// створити ендпоінт для додавання оголошення до обраних
router.patch(
  '/favorites/:id',
  userValidation,
  ctrlWrapper(ctrl.addNoticeToFavorites)
);

// створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
router.delete(
  '/favorites/:id',
  userValidation,
  ctrlWrapper(ctrl.deleteNoticeFromFavorites)
);

module.exports = router;
