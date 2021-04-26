import { http } from "api/http";

export function getFlights<T>(
  fly_from: string,
  fly_to: string,
  date_from: string,
  date_to: string
) {
  const url = encodeURI(`/flights?v=3&partner=skypicker&fly_from=${fly_from}&fly_to=${fly_to}&date_from=${date_from}&date_to=${date_to}`);
  return http.get<T>(url);
}
