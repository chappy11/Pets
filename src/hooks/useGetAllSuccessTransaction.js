import { Compress, GetAppRounded } from "@mui/icons-material";
import React, { useState, useEffect, useCallback } from "react";
import { useMemo } from "react";
import { ShopReport } from "../services/ShopReport";
import { compareDate, getDateRange, isDateBetween } from "../utils/date";
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

      setTransactions(res.data.data);
      const sales = {
        all: getTotalSales("", res.data.data),
        day: getTotalSales("d", res.data.data),
        week: getTotalSales("w", res.data.data),
        month: getTotalSales("M", res.data.data),
      };

      setTotalSales(sales);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alertError();
    }
  };

  const getTotalSales = (range, data) => {
    let total = 0;
    const dateRange = getDateRange(range);

    const filterd = data.filter((val) =>
      isDateBetween(dateRange.firstDate, dateRange.lastDate, val.date_success)
    );

    const list = range === "" ? data : filterd;

    list.forEach((element) => {
      total += parseFloat(element.order_total_amout);
    });

    return total;
  };

  const getByMonth = useCallback(() => {
    const dateRange = getDateRange("M");
    const filteredData = transactions.filter((val) =>
      isDateBetween(dateRange.firstDate, dateRange.lastDate, val.date_success)
    );
    setTransactions(filteredData);
  }, [setTransactions, transactions]);

  const getByWeek = useCallback(() => {
    const dateRange = getDateRange("w");
    const filteredData = transactions.filter((val) =>
      isDateBetween(dateRange.firstDate, dateRange.lastDate, val.date_success)
    );
    setTransactions(filteredData);
  }, [setTransactions, transactions]);

  const getByDays = useCallback(() => {
    const dateRange = getDateRange("d");
    const filteredData = transactions.filter((val) =>
      isDateBetween(dateRange.firstDate, dateRange.lastDate, val.date_success)
    );
    setTransactions(filteredData);
  }, [setTransactions, transactions]);

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
    transactions.forEach((val) => {
      total += parseFloat(val.order_total_amout);
    });

    return formatCurrency(total);
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
