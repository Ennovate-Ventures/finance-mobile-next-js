"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MainLayout from "@/components/MainLayout";
import { httpRequest } from "@/utils/http";
import { useEffect, useState } from "react";

function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [values, setValues] = useState({
    title: "",
    amount: "",
    expAmount: 0,
    count: 0
  });

  const handleTitleChange = (e: any) => {
    setValues({
      ...values,
      title: e.target.value,
    });
  };

  const handleCountChange = (e: any) => {
    setValues({
      ...values,
      count: e.target.value,
    });
  };

  const handleAmountChange = (e: any) => {
    setValues({
      ...values,
      amount: e.target.value,
    });
  };

  const fetchData = async() => {
   
    try {
      setPageLoading(true)
        const response = await httpRequest("GET", `/expenditure/projectsum/today/${localStorage.getItem("projectId")}`)

        if(response.message == "success"){
            setValues({
                ...values,
                expAmount: response.amount
            })
            setPageLoading(false)
        }
        
    } catch (error) {
       setPageLoading(false) 
    }
  }

  const postData = async () => {
    try {
      setLoading(true);
      const response = await httpRequest("POST", "/expenditure/store", {
        title: values.title,
        amount: values.amount,
        project_id: localStorage.getItem("projectId"),
        count: values.count
      });
      if (response) {
        setLoading(false);
        setValues({
          title: "",
          amount: "",
          expAmount: 0,
          count: 0
        });
        fetchData()
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  },[])

  return (
    <MainLayout>
      {
        pageLoading ? <LoadingSpinner /> : <>
        <div className="mb-5">
        <p className="font-semibold text-base mb-1">Expenditure today</p>
        <p className="text-2xl font-semibold">
          {Intl.NumberFormat().format(values.expAmount)}
        </p>
      </div>
      <div className="flex flex-col gap-y-5">
        <div>
          <p>Expenditure name</p>
          <input
            onChange={handleTitleChange}
            type="text"
            placeholder="Type here"
            className="input input-bordered text-gray-600 placeholder:text-gray-500 w-full max-w-xs"
          />
        </div>

        <div>
          <p>Amount</p>
          <input
            onChange={handleAmountChange}
            type="text"
            placeholder="Type here"
            className="input input-bordered text-gray-600 placeholder:text-gray-500 w-full max-w-xs"
          />
        </div>

        <div>
              <p>Count</p>
              <input
                onChange={handleCountChange}
                type="text"
                placeholder="Type here"
                className="input input-bordered text-gray-600 placeholder:text-gray-500 w-full max-w-xs"
              />
            </div>

        <div
          onClick={postData}
          className="cursor-pointer bg-black text-gray-300 max-w-fit px-8 py-3 rounded-md"
        >
          {loading ? "Submitting..." : "Submit"}
        </div>
      </div>
        </>
      }
    </MainLayout>
  );
}

export default Page;
