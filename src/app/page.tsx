"use client";

import { httpRequest } from "@/utils/http";
import { useUser } from "@/utils/store/UserContext";
import { OTPInput, SlotProps } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    try {
      const response = await httpRequest("POST", "/mobilelogin", {
        otp,
      });

      if (response) {
        setUser(response.user);
        localStorage.setItem("token", response.token);
        localStorage.setItem("projectId", response.project_id);
        setLoading(false);
        // setOtp("");
        router.push("/overview");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otp.length == 6) {
      login();
    }
  }, [otp]);

  return (
    <div className="bg-customYellow h-screen flex flex-col items-center justify-center">
      <div className="font-bold text-4xl text-black">Login</div>
      <div className="my-5">
        <OTPInput
          maxLength={6}
          onChange={(e: any) => {
            setOtp(e);
          }}
          containerClassName="group flex items-center has-[:disabled]:opacity-30"
          render={({ slots }) => (
            <>
              <div className="flex">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>

              <FakeDash />

              <div className="flex">
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />
      </div>
      <div className="mt-5">{loading ? <HashLoader /> : ""}</div>
    </div>
  );
}

// Feel free to copy. Uses @shadcn/ui tailwind colors.
function Slot(props: SlotProps) {
  return (
    <div
      className={`relative w-10 h-14 text-[2rem] flex items-center justify-center transition-all duration-300 border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20 outline outline-0 outline-accent-foreground/20 ${
        props.isActive ? "outline-4 outline-accent-foreground" : ""
      }`}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}

// Inspired by Stripe's MFA input.
function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-border bg-black" />
    </div>
  );
}
