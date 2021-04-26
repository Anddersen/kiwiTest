import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { List, notification, Layout, PageHeader } from "antd";
import { block } from "bem-cn";

import { getFlights } from "./resource/resource";

import * as T from "./types";

import "./flights.scss";
const flightsBlock = block("flightsBlock");

const Flights: React.FC = () => {
  let history = useHistory();
  const { Content } = Layout;

  let { from, to, depart, back } = useParams<{
    from: string;
    to: string;
    depart: string;
    back: string;
  }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flights, setFlights] = useState<T.Flight[]>([]);

  useEffect(() => {
    const getListFlights = async () => {
      try {
        setIsLoading(true);
        const currentDepart = moment(depart, "DD-MM-YYYY").format("DD/MM/YYYY");
        const currentBack = moment(back, "DD-MM-YYYY").format("DD/MM/YYYY");

        const {
          data: { data },
        } = await getFlights<{ data: T.Flight[] }>(
          from,
          to,
          currentDepart,
          currentBack
        );
        setIsLoading(false);
        setFlights(data);
      } catch (e) {
        setIsLoading(false);
        notification.error({
          message: "Error",
          description: e.statusText ? e.statusText.toString() : e.toString(),
        });
      }
    };
    getListFlights();
  }, [from, to, depart, back]);

  return (
    <Layout className={flightsBlock()}>
      <PageHeader
        className="site-page-header"
        onBack={() => history.push("/")}
        title="Flights"
      />
      <Content className={flightsBlock("content")}>
        <List
          itemLayout="horizontal"
          dataSource={flights}
          loading={isLoading}
          pagination={{
            position: "top",
            pageSize: 5,
          }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <p>
                    {item.cityFrom} ({item.countryFrom.name}) - {item.cityTo} (
                    {item.countryTo.name}) /{" "}
                    {moment.unix(item.dTime).format("DD-MM-YYYY h:mm A")}
                    &nbsp;-&nbsp;
                    {moment.unix(item.aTime).format("DD-MM-YYYY h:mm A")}
                  </p>
                }
                description={item.route.map((e, i) => {
                  return (
                    <p key={i}>
                      {e.cityFrom} - {e.cityTo}
                    </p>
                  );
                })}
              />
              <div>
                <b>{item.price} €</b>
              </div>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Flights;
