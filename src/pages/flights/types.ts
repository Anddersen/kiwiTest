export interface Flight {
  aTime: number;
  dTime: number;
  cityFrom: string;
  cityTo: string;
  countryFrom: Country;
  countryTo: Country;
  price: number;
  route: Route[];
}

interface Route {
  cityFrom: string;
  cityTo: string;
}

interface Country {
  code: string;
  name: string;
}
