import React from "react";
import Sidebar from "../components/Sidebar";
import { Row, Table, Col } from "react-bootstrap";
import {
  Button,
  Container,
  DashBoardCard,
  SizeBox,
  TextInput,
  Title,
  Text,
  Print,
  HeaderText,
} from "../../../components";
import useGetAllSuccessTransaction from "../../../hooks/useGetAllSuccessTransaction";
import * as S from "./style";
import { defaultThemes } from "../../../constants/DefaultThemes";
import { formatCurrency } from "../../../utils/Money";
import { useMemo, useState, useCallback, useEffect } from "react";
import { formatDisplayDate } from "../../../utils/date";
import { Link } from "react-router-dom";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";
import { Orders } from "../../../services/Orders";

export default function Reports() {
  const {
    transactions,
    filteredTransaction,
    getSales,
    getByDays,
    getByWeek,
    getByMonth,
    totalSales,
    getByDateSearch,
    getData,
  } = useGetAllSuccessTransaction();
  const { user } = useGetUserFromStorage();
  const [isPrint, setIsPrint] = useState(false);
  const [dates, setDates] = useState({
    start: "",
    end: "",
  });

  const onChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const getTransction = useCallback(
    async (order_id) => {
      try {
        const resp = await Orders.getOrderByShop(order_id, user?.shop_id);
        return resp.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    [transactions]
  );

  const displaySales = useMemo(() => {
    if (totalSales) {
      return (
        <Row>
          <Col>
            <DashBoardCard
              onClick={() => getByDays()}
              color={defaultThemes.secondary}
              title="Today Sales"
              subtitle={formatCurrency(totalSales?.day)}
            />
          </Col>
          <Col>
            <DashBoardCard
              onClick={() => getByWeek()}
              color={defaultThemes.secondary}
              title="This Week"
              subtitle={formatCurrency(totalSales?.week)}
            />
          </Col>
          <Col>
            <DashBoardCard
              onClick={() => getByMonth()}
              color={defaultThemes.secondary}
              title="This Month"
              subtitle={formatCurrency(totalSales?.month + 0)}
            />
          </Col>
        </Row>
      );
    }
  }, [totalSales]);

  const displayForPrint = useMemo(() => {
    if (isPrint) {
      return (
        <Print
          fullName={
            user?.ownerFirstName +
            " " +
            user?.ownerMiddleName +
            " " +
            user?.ownerLastName
          }
          cancelText={"Cancel"}
          onCancel={() => setIsPrint(false)}
        >
          <SizeBox height={10} />
          <HeaderText>Sales Report</HeaderText>
          <SizeBox height={15} />
          <Table variant="bordered">
            <thead>
              <tr>
                <th>Reference No.</th>
                <th>Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransaction?.map((val) => (
                <tr>
                  <td>{val.shopReference}</td>
                  <td>{formatDisplayDate(val.date_success)}</td>
                  <td>{val.order_total_amout}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Print>
      );
    }
  }, [isPrint]);

  function handleGenerate() {
    getByDateSearch(dates.start, dates.end);
  }

  const getTrans = () => {
    getTransction(1);
  };

  function handleReset() {
    setDates({
      start: "",
      end: "",
    });
    getData();
  }

  return (
    <Sidebar>
      <Container>
        {displayForPrint}
        {!isPrint && (
          <>
            <Title>Reports</Title>
            <SizeBox height={20} />
            {displaySales}
            <SizeBox height={10} />
            <Row>
              <Col>
                <TextInput
                  type="date"
                  name="start"
                  onChange={onChange}
                  value={dates.start}
                />
              </Col>
              <Col>
                {" "}
                <TextInput
                  type="date"
                  name="end"
                  onChange={onChange}
                  value={dates.end}
                />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <SizeBox height={15} />
                    <Button onClick={() => handleGenerate()}>Generate</Button>
                  </Col>
                  <Col>
                    <SizeBox height={15} />
                    <Button color="red" onClick={() => handleReset()}>
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <SizeBox height={12} />
            <Print
              fullName={
                user?.ownerFirstName +
                " " +
                user?.ownerMiddleName +
                " " +
                user?.ownerLastName
              }
            >
              <Table variant="bordered">
                <thead>
                  <tr>
                    <th>Reference No.</th>
                    <th>Date</th>
                    <th>Total Amount</th>
                    <th>Order item</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransaction?.map((val) => (
                    <>
                      <tr key={val.order_id}>
                        <td>{val.referenceNo}</td>
                        <td>{formatDisplayDate(val.date_success)}</td>
                        <td>{val.order_total_amout}</td>
                        <td>
                          <Table>
                            <thead>
                              <tr>
                                <th>Item Name</th>
                                <th>Item Sold</th>
                                <th>Stock</th>
                              </tr>
                            </thead>
                            <tbody>
                              {val.order_item.map((item, i) => (
                                <tr>
                                  <td>{item.productName}</td>
                                  <td>{item.orderItemNo}</td>
                                  <td>{item.stock}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </td>
                      </tr>
                    </>
                  ))}
                  <tr>
                    <td>
                      <Text>Total</Text>
                    </td>
                    <td></td>
                    <td> {getSales}</td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Print>
            {transactions?.length < 1 ? (
              <S.NoItemFound>No Item Found</S.NoItemFound>
            ) : null}
          </>
        )}
      </Container>
    </Sidebar>
  );
}
