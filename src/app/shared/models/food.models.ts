export interface FoodCategory {
  id: number;
  name: string;
  image: string;
}

export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  image: string;

  category: FoodCategory;
}
