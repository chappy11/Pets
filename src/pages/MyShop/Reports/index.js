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
} from "../../../components";
import useGetAllSuccessTransaction from "../../../hooks/useGetAllSuccessTransaction";
import * as S from "./style";
import { defaultThemes } from "../../../constants/DefaultThemes";
import { formatCurrency } from "../../../utils/Money";
import { useMemo, useState } from "react";
import { formatDisplayDate } from "../../../utils/date";
import { Link } from "react-router-dom";

export default function Reports() {
  const {
    transactions,
    isLoading,
    getSales,
    getByDays,
    getByWeek,
    getByMonth,
    totalSales,
    getByDateSearch,
    getData,
  } = useGetAllSuccessTransaction();

  const [dates, setDates] = useState({
    start: "",
    end: "",
  });

  const onChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

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
              color={defaultThemes.color001}
              title="This Month"
              subtitle={formatCurrency(totalSales?.month + 0)}
            />
          </Col>
        </Row>
      );
    }
  }, [totalSales]);

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

  return (
    <Sidebar>
      <Container>
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
        <Table variant="bordered">
          <thead>
            <tr>
              <th>Reference No.</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions?.map((val) => (
              <tr>
                <td>{val.shopReference}</td>
                <td>{formatDisplayDate(val.date_success)}</td>
                <td>{val.order_total_amout}</td>
                <td>
                  <Link to="/vieworder">View Order</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {transactions?.length < 1 ? (
          <S.NoItemFound>No Item Found</S.NoItemFound>
        ) : null}
        <Text>{getSales}</Text>
      </Container>
    </Sidebar>
  );
}
