import React, { Dispatch, SetStateAction, useState } from "react";
import { notification, Select } from "antd";
import { AxiosPromise } from "axios";

import * as T from "../../types";
import { useDebounce } from "shared/helpers/useDebounce";

interface Props {
  getLocations<T>(text: string): AxiosPromise<T>;

  setSelectedLocation: Dispatch<SetStateAction<string | undefined>>;
}

const SelectLocation: React.FC<Props> = React.memo(
  ({ getLocations, setSelectedLocation }) => {
    const { Option } = Select;

    const [location, setLocations] = useState<T.Location[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const options = location.map((l) => {
      return (
        <Option key={l.id} value={l.code}>
          {l.name}
        </Option>
      );
    });

    const handleSearch = (searchText: string) => {
      setSearchText(searchText);
    };

    useDebounce(
      () => {
        const onGetLocations = async () => {
          try {
            setIsLoading(true);

            const {
              data: { locations },
            } = await getLocations<{ locations: T.Location[] }>(searchText);
            setLocations(locations);

            setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
            notification.error({
              message: "Error",
              description: e.statusText
                ? e.statusText.toString()
                : e.toString(),
            });
          }
        };
        !!searchText.length && onGetLocations();
      },
      500,
      [searchText]
    );

    return (
      <Select
        data-testid="rtl-selectLocation"
        style={{ width: 200 }}
        showSearch
        onSearch={handleSearch}
        onChange={(e: string) => {
          setSelectedLocation(e);
        }}
        filterOption={false}
        loading={isLoading}
      >
        {options}
      </Select>
    );
  }
);

export default SelectLocation;
