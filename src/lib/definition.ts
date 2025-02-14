import { getMeals } from "../actions/meals";

export type iconProps = {
    iconName: string;
    alt: string;
    iconPath: string;
}

export type MealProps = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  country: string;
  ingredients: string;
  cookingTime: bigint;
  cookingProcess: string;
}

export type MealDataTableProps = Omit<MealProps, 'cookingTime' | 'cookingProcess' | 'ingredients'>

export type MealCardProps = {
  id?: string;
  slug?: string;
  title: string;
  imageUrl: string;
  country?: string;
  className?: string;
}

export type ContinentProps = {
    id: string;
    title: string;
    countries: string[];
};

export type getMealType = typeof getMeals

export type HeroMealProps = {
  className: string;
  alt: string;
  imagePath: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export type ImageUploadProps = {
  info?: {
      url?: string
  } | string
}

export type EmailTemplateProps = {
  email: string;
  username: string;
  emailMessage: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username?: string;
      avatar?: string;
      role?: string;
    }
  }

  interface User {
    id: string;
    email: string;
    username?: string;
    avatar?: string;
    role?: string;
  }
}
