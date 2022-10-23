import { Compress, GetAppRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import React, { useState, useEffect, useCallback } from "react";
import { useMemo } from "react";
import { ShopReport } from "../services/ShopReport";
import {
  compareDate,
  formatDisplayDate,
  getDateRange,
  isDateBetween,
  standarDateFormat,
} from "../utils/date";
import { formatCurrency } from "../utils/Money";
import { getItem, KEY } from "../utils/storage";
import usePrompts from "./usePrompts";

export default function useGetAllSuccessTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(null);
  const { alertError, alertWarning } = usePrompts();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const account = await getItem(KEY.ACCOUNT);
      const res = await ShopReport.getShopReports(account?.shop_id);
      const sales = {
        all: getTotalSales("", res.data.data),
        day: getTotalSales("d", res.data.data),
        week: getTotalSales("w", res.data.data),
        month: getTotalSales("M", res.data.data),
      };
      console.log("RFES", res.data.data);
      setTotalSales(sales);
      setIsLoading(false);
      setTransactions(res.data.data);
    } catch (error) {
      console.log(error);
      alertError();
    }
  };

  const getTotalSales = (range, data) => {
    let total = 0;
    const dateRange = getDateRange(range);
    const current = dayjs(new Date());
    if (data?.length > 0) {
      let filterd = [];

      if (range !== "d") {
        filterd = data.filter((val) =>
          isDateBetween(
            dateRange.firstDate,
            dateRange.lastDate,
            val.date_success
          )
        );
      }

      filterd = data.filter(
        (val) =>
          standarDateFormat(current) == standarDateFormat(val.date_success)
      );

      const list = range === "" ? data : filterd;

      list.forEach((element) => {
        total += parseFloat(element.order_total_amout);
      });

      return total;
    }

    return 0;
  };

  const getByMonth = () => {
    const dateRange = getDateRange("M");
    const filteredData = transactions.filter((val) =>
      isDateBetween(dateRange.firstDate, dateRange.lastDate, val.date_success)
    );
    setTransactions(filteredData);
  };
  const getByWeek = () => {
    const dateRange = getDateRange("w");
    const filteredData = transactions.filter((val) =>
      isDateBetween(dateRange.firstDate, dateRange.lastDate, val.date_success)
    );
    setTransactions(filteredData);
  };

  const getByDays = () => {
    const dateRange = getDateRange("d");
    const current = dayjs(new Date());
    const filteredData = transactions.filter(
      (val) =>
        standarDateFormat(current) === standarDateFormat(val.date_success)
    );

    setTransactions(filteredData);
  };

  const getByDateSearch = useCallback(
    (start, end) => {
      if (start === null) {
        alertWarning("Please specify start date");
        return;
      }

      if (end === null) {
        alertWarning("Please specify end date");
        return;
      }

      if (!compareDate(start, end)) {
        alertWarning("Invalid date sequence");
        return;
      }

      const filtered = transactions.filter((val) =>
        isDateBetween(start, end, val.date_success)
      );
      setTransactions(filtered);
    },
    [setTransactions, transactions]
  );

  const getSales = useMemo(() => {
    let total = 0;
    if (transactions?.length > 0) {
      transactions.forEach((val) => {
        total += parseFloat(val.order_total_amout);
      });

      return formatCurrency(total);
    }

    return formatCurrency(0);
  }, [setTransactions, transactions]);

  return {
    transactions,
    isLoading,
    getByDays,
    getByMonth,
    getByWeek,
    totalSales,
    getByDateSearch,
    getData,
    getSales,
  };
}
