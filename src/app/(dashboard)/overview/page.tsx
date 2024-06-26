"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MainLayout from "@/components/MainLayout";
import StatCard from "@/components/StatCard";
import { httpRequest } from "@/utils/http";
import React, { useEffect, useState } from "react";

function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [values, setValues] = useState({
    incomeAmount: 0,
    expenditureAmount: 0,
    diff: 0,
  });
  const fetchData = async () => {
    try {
      const response = await httpRequest(
        "GET",
        `/dashboard/mobile/project/${localStorage.getItem("projectId")}`
      );
      if (response.success) {
        setValues({
          incomeAmount: response.income_amount,
          expenditureAmount: response.expenditure_amount,
          diff: response.difference,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-y-4">
          <StatCard text="Profit today" amount={values.diff} />
          <StatCard text="Expenditure" amount={values.expenditureAmount} />
          <StatCard text="Income" amount={values.incomeAmount} />
        </div>
      )}
    </MainLayout>
  );
}

export default Page;
