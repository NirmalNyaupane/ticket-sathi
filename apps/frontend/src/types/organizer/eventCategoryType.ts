import categoryValidation from '@/lib/formvalidation/organizer/categoryValidation';
import {z} from 'zod';

export type EventCategoryFormData = z.infer<typeof categoryValidation>;

