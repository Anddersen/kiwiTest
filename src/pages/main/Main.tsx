import React, { useState } from "react";
import { Space, Form, Button, DatePicker, Layout } from "antd";
import { block } from "bem-cn";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { getLocations } from "./resource/resource";

import SelectLocation from "./components/selectLocation/SelectLocation";

import "./main.scss";
const main = block("main");

const Main: React.FC = () => {
  let history = useHistory();

  const [selectedLocationTo, setSelectedLocationTo] = useState<
    string | undefined
  >(undefined);
  const [selectedLocationFrom, setSelectedLocationFrom] = useState<
    string | undefined
  >(undefined);
  const [dateDepart, setDateDepart] = useState<string>(
    moment().format("DD-MM-YYYY")
  );
  const [dateReturn, setDateReturn] = useState<string>("");

  const handleSubmit = () => {
    history.push(
      encodeURI(
        `/flights/${selectedLocationFrom}/${selectedLocationTo}/${dateDepart}/${dateReturn}`
      )
    );
  };

  return (
    <Layout className={main()}>
      <Space className={main("space")}>
        <Form name="basic" layout="inline">
          <Form.Item label="From">
            <SelectLocation
              getLocations={getLocations}
              setSelectedLocation={setSelectedLocationFrom}
            />
          </Form.Item>

          <Form.Item label="To">
            <SelectLocation
              getLocations={getLocations}
              setSelectedLocation={setSelectedLocationTo}
            />
          </Form.Item>

          <Form.Item label="Depart">
            <DatePicker
              disabledDate={(current) => current < moment().endOf("day")}
              defaultValue={moment()}
              format={"DD-MM-YYYY"}
              onChange={(_, dateString: string) => {
                setDateDepart(dateString);
              }}
            />
          </Form.Item>

          <Form.Item label="Return">
            <DatePicker
              disabledDate={(current) => current < moment().endOf("day")}
              format={"DD-MM-YYYY"}
              onChange={(_, dateString: string) => {
                setDateReturn(dateString);
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !selectedLocationTo ||
                !selectedLocationFrom ||
                !dateDepart.length ||
                !dateReturn.length
              }
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};

export default Main;
