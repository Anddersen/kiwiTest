import { http } from "api/http";

export function getLocations<T>(searchText: string) {
  const url = encodeURI(`/locations?term=${searchText}&location_types=city`);
  return http.get<T>(url);
}
