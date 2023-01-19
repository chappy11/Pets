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
  const [filteredTransaction, setFilteredTransaction] = useState([]);
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
        all: getAllTotalSales(res.data.data),
        day: getSalesByDay(res.data.data),
        week: getSalesByWeek(res.data.data),
        month: getSalesByMonth(res.data.data),
      };
      setTotalSales(sales);
      setIsLoading(false);
      setTransactions(res.data.data);
      setFilteredTransaction(res.data.data);
    } catch (error) {
      console.log(error);
      alertError();
    }
  };

  const getAllTotalSales = (data) => {
    let total = 0;

    if (data?.length < 1) {
      return 0;
    }

    data?.forEach((element) => {
      total += parseFloat(element.order_total_amout);
    });

    return total;
  };

  const getSalesByDay = (data) => {
    const current = dayjs(new Date());
    let total = 0;
    if (data?.length < 1) {
      return 0;
    }
    const filteredData = data?.filter(
      (val) =>
        standarDateFormat(current.toString()) ===
        standarDateFormat(val.date_success)
    );

    filteredData?.forEach((element) => {
      total += parseFloat(element.order_total_amout);
    });

    return total;
  };

  const getSalesByWeek = (data) => {
    const range = getDateRange("w");
    let total = 0;
    if (data?.length < 1) {
      return 0;
    }
    const filterdData = data?.filter((val) =>
      isDateBetween(range.firstDate, range.lastDate, val.date_success)
    );
    filterdData?.forEach((element) => {
      total += parseFloat(element.order_total_amout);
    });

    return total;
  };

  const getSalesByMonth = (data) => {
    const range = getDateRange("M");
    let total = 0;
    if (data?.length < 1) {
      return 0;
    }
    const filterdData = data?.filter((val) =>
      isDateBetween(range.firstDate, range.lastDate, val.date_success)
    );
    filterdData?.forEach((element) => {
      total += parseFloat(element.order_total_amout);
    });

    return total;
  };

  const getByMonth = () => {
    const dateRange = getDateRange("M");

    const filteredData = transactions.filter((val) =>
      isDateBetween(dateRange.firstDate, dateRange.lastDate, val.date_success)
    );
    setFilteredTransaction(filteredData);
  };

  const getByWeek = () => {
    const dateRange = getDateRange("w");
    const filteredData = transactions.filter((val) =>
      isDateBetween(dateRange.firstDate, dateRange.lastDate, val.date_success)
    );
    setFilteredTransaction(filteredData);
  };

  const getByDays = () => {
    const dateRange = getDateRange("d");
    const current = dayjs();
    console.log(standarDateFormat(current));
    const filteredData = transactions.filter((val) => {
      return standarDateFormat(current) === standarDateFormat(val.date_success);
    });

    setFilteredTransaction(filteredData);
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
      const endDate = standarDateFormat(dayjs(end).add(1, "day"));
      const startDate = standarDateFormat(start);
      const isDateIsEqual = startDate === standarDateFormat(end);
      const filtered = transactions.filter((val) => {
        if (isDateIsEqual) {
          return startDate === standarDateFormat(val.date_success);
        } else {
          return isDateBetween(startDate, endDate, val.date_success);
        }
      });
      console.log(filtered.length);
      setFilteredTransaction(filtered);
    },
    [filteredTransaction, transactions, setFilteredTransaction]
  );

  const getSales = useMemo(() => {
    let total = 0;
    if (filteredTransaction?.length > 0) {
      filteredTransaction.forEach((val) => {
        total += parseFloat(val.order_total_amout);
      });

      return formatCurrency(total);
    }

    return formatCurrency(0);
  }, [setFilteredTransaction, filteredTransaction]);

  return {
    transactions,
    isLoading,
    getByDays,
    getByMonth,
    getByWeek,
    totalSales,
    getByDateSearch,
    filteredTransaction,
    getData,
    getSales,
  };
}
