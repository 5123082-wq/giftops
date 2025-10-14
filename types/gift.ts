export type GiftItem = {
  sku: string;
  name: string;
  qty: number;
};

export type GiftSet = {
  id: string;
  title: string;
  description: string;
  images: string[];
  items: GiftItem[];
  unit_price: number;
  lead_time_days: number;
  personalization?: {
    name_print?: boolean;
    options?: string[];
  };
  constraints?: {
    no_alcohol?: boolean;
    allergens?: string[];
  };
  tags?: string[];
  gender?: 'unisex' | 'female' | 'male';
  recipient_status?: string[];
  holiday_themes?: string[];
  rating?: number;
  in_stock?: boolean;
};

export type ClientCase = {
  id: string;
  company: string;
  logo: string;
  summary: string;
  challenge: string;
  scale: string;
  sla: string;
  feedback: string;
};
