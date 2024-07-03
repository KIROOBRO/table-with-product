import { ConfirmModalModel } from '@core/models';

export const DELETE_PRODUCT: ConfirmModalModel = {
  title: 'Delete product',
  subtitle:
    'Deleting an product is irreversible.\n Are you sure you want to delete?',
  leftBtnText: `Don't delete the product`,
  rightBtnText: 'Delete the product'
};
