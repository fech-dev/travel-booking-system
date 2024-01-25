import { faker } from "@faker-js/faker";
import type { Travel } from "~/schemas";

export const createTravel = (): Travel => {
  const startsAt = faker.date.soon();

  return {
    id: faker.number.int(),
    name: "Road to " + faker.location.state(),
    description: faker.lorem.paragraphs(3),
    average_user_rating: faker.number.float({
      min: 0,
      max: 5,
      precision: 0.01,
    }),
    picture: faker.image.urlLoremFlickr({ category: "travel" }),
    price: faker.commerce.price(),
    departure_date: startsAt,
    return_date: faker.date.future({ refDate: startsAt }),
  };
};
