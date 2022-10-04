import React, { useEffect, useState } from "react";
import { Subscription } from "../services/Subscription";

export default function useGetSubscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getSubscription();
  }, [isRefreshing]);

  const getSubscription = async () => {
    const res = await Subscription.getSubscription();
    setIsRefreshing(false);
    if (res.data.status == 1) {
      setSubscriptions(res.data.data);
    } else {
      setSubscriptions([]);
    }
  };

  return {
    subscriptions,
    setIsRefreshing,
  };
}
