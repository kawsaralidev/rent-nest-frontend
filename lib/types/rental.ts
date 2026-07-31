export interface IRental {
  id: string;
  status: string;
  payment: {
    id: string;
    status: string;
  } | null;
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
  };
}
