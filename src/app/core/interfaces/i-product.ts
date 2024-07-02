import { ICategory } from '@core/interfaces/i-category';
import { IField } from '@core/interfaces/i-field';
import { TExpiration } from '@core/types/t-expiration';

export interface IProduct {
  id: number;
  name: string;
  expiration_type: TExpiration;
  category: ICategory;
  fields: IField[];
  manufacture_date: Date;
  expiration_date: Date;
  comment: string;
  created_at: Date;
  updated_at: Date;
}
