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
  Print,
  HeaderText,
} from "../../../components";
import useGetAllSuccessTransaction from "../../../hooks/useGetAllSuccessTransaction";
import * as S from "./style";
import { defaultThemes } from "../../../constants/DefaultThemes";
import { formatCurrency } from "../../../utils/Money";
import { useMemo, useState, useCallback, useEffect } from "react";
import { formatDisplayDate, standarDateFormat } from "../../../utils/date";
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

  const dateRange = useMemo(() => {
    if (filteredTransaction) {
      const size = filteredTransaction.length - 1;
      console.log(dates);
      if (dates.start && dates.end) {
        return (
          standarDateFormat(dates.start) + " - " + standarDateFormat(dates.end)
        );
      }

      return (
        standarDateFormat(filteredTransaction[size]?.date_success) +
        " - " +
        standarDateFormat(filteredTransaction[0]?.date_success)
      );
    }
  }, [filteredTransaction]);

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
                  <td style={{ background: "pink" }}>{val.shopReference}</td>
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

  function handleReset() {
    setDates({
      start: "",
      end: "",
    });
    getData();
  }

  const displayTable = useMemo(() => {
    return (
      <Print
        fullName={
          user?.ownerFirstName +
          " " +
          user?.ownerMiddleName +
          " " +
          user?.ownerLastName
        }
        dateRange={dateRange}
      >
        <Table variant="bordered">
          <thead>
            <tr>
              <th>Reference No.</th>
              <th>Date</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Order</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransaction?.map((val) => (
              <>
                <tr key={val.order_id}>
                  <td>{val.referenceNo}</td>
                  <td>{val.date_success}</td>
                  <td>
                    {" "}
                    <Table>
                      <tbody>
                        {val.order_item.map((item, i) => (
                          <tr>
                            <td>{item.productName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <SizeBox height={23} />
                  </td>
                  <td>
                    {" "}
                    <Table>
                      <tbody>
                        {val.order_item.map((item, i) => (
                          <tr>
                            <td>{item.orderItemNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <SizeBox height={23} />
                  </td>
                  <td>
                    <Table>
                      <tbody>
                        {val.order_item.map((item, i) => (
                          <tr>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <SizeBox height={23} />
                  </td>
                  <td>
                    {" "}
                    <Table>
                      <tbody>
                        {val.order_item.map((item, i) => (
                          <tr>
                            <td>{item.orderItemAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <b>{val.order_total_amout}</b>
                  </td>
                </tr>
              </>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>
                {" "}
                <b>Total Sales</b>{" "}
              </td>
              <td></td>
              <td></td>
              <td>
                {" "}
                <b>{getSales}</b>
              </td>
            </tr>
          </tbody>
        </Table>
      </Print>
    );
  }, [filteredTransaction]);

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
              dateRange={dateRange}
              textHeader="Sales Reports"
            >
              <Table variant="bordered">
                <thead>
                  <tr>
                    <th>Reference No.</th>
                    <th>Date</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Order</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransaction?.map((val) => (
                    <>
                      <tr key={val.order_id} style={{ background: "#add8e6" }}>
                        <td>{val.referenceNo}</td>
                        <td>{val.date_success}</td>
                        <td>
                          {" "}
                          <Table>
                            <tbody>
                              {val.order_item.map((item, i) => (
                                <tr>
                                  <td>{item.productName}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <SizeBox height={23} />
                        </td>
                        <td>
                          {" "}
                          <Table>
                            <tbody>
                              {val.order_item.map((item, i) => (
                                <tr>
                                  <td>{item.orderItemNo}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <SizeBox height={23} />
                        </td>
                        <td>
                          <Table>
                            <tbody>
                              {val.order_item.map((item, i) => (
                                <tr>
                                  <td>{item.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <SizeBox height={23} />
                        </td>
                        <td>
                          {" "}
                          <Table>
                            <tbody>
                              {val.order_item.map((item, i) => (
                                <tr>
                                  <td>{item.orderItemAmount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <b>{val.order_total_amout}</b>
                        </td>
                      </tr>
                    </>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      {" "}
                      <b>Total Sales</b>{" "}
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      {" "}
                      <b>{getSales}</b>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Print>
            {filteredTransaction?.length < 1 ? (
              <S.NoItemFound>No Item Found</S.NoItemFound>
            ) : null}
          </>
        )}
      </Container>
    </Sidebar>
  );
}
