import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const DIRNAME = fileURLToPath(new URL(".", import.meta.url));

const db = {
  travels: [
    {
      id: 1,
      name: "Road to Rome",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      average_user_rating: 5,
      picture:
        "https://tse1.mm.bing.net/th?id=OIP.bqpkNMukACqi_JLjwuQrNQHaE8&pid=Api",
      price: "100.00",
      departure_date: "2024-05-10T00:00:00.000Z",
      return_date: "2024-05-15T00:00:00.000Z",
    },
    {
      id: 2,
      name: "Road to Milan",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      average_user_rating: 3.5,
      picture:
        "https://tse4.mm.bing.net/th?id=OIP.WynZ4ka2lN79naQqpkrgFAHaFj&pid=Api",
      price: "150.00",
      departure_date: "2024-05-10T00:00:00.000Z",
      return_date: "2024-05-15T00:00:00.000Z",
    },
    {
      id: 3,
      name: "Road to Florence",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      average_user_rating: 4,
      picture:
        "https://tse3.mm.bing.net/th?id=OIP.gp4PD1tN6GBy-7gDOzyRiQHaEA&pid=Api",
      price: "130.00",
      departure_date: "2024-05-10T00:00:00.000Z",
      return_date: "2024-05-15T00:00:00.000Z",
    },
    {
      id: 4,
      name: "Road to Cagliari",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      average_user_rating: 4.5,
      picture:
        "https://www.sardegna.info/wp-content/uploads/sites/5/cagliari-hd.jpg",
      price: "50.00",
      departure_date: "2024-07-10T00:00:00.000Z",
      return_date: "2024-07-13T00:00:00.000Z",
    },
  ],
  bookings: [],
};

(async () => {
  const nuxtDbPath = path.resolve(DIRNAME, ".nuxt/dev");

  const filePath = path.join(nuxtDbPath, "dev.json");

  await fs.writeFile(filePath, JSON.stringify(db, null, 2));
})();
