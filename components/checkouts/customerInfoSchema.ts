import { z } from 'zod';

export default z.object({
  email: z.string().email(),
  shipping: z.string().min(2, 'Country/Region field required!'),
  firstname: z.string().min(1, 'Firstname field required!'),
  lastname: z.string().min(1, 'Lastname field required!'),
  company: z.string().optional(),
  address: z.string().min(3, 'Address field required!'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City field required!'),
  zipcode: z.string().min(2, 'Zip code field required!'),
  phone: z.string().min(10, 'Valid phone number required!'),
});
