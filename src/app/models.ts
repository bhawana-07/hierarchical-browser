export interface Line {
  id: number;
  plant_id: number;
  line_name: string;
  // …other fields
}

export interface Plant {
  id: number;
  location_id: number;
  plant_name: string;
  lines: Line[];
  plant_code: string
}

export interface Location {
  id: number;
  state_id: number;
  location_name: string;
  plants: Plant[];
  location_code: string
}

export interface State {
  id: number;
  country_id: number;
  state_name: string;
  locations: Location[];
  state_code: string
}

export interface Country {
  id: number;
  company_id: number;
  country_name: string;
  country_code: string;
  states: State[];
}

export interface Company {
  id: number;
  company_name: string;
  company_code: string;
  countries: Country[];
}
