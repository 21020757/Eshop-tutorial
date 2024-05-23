import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1976d2",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1976d2",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
const steps = [
  "Đặt hàng",
  "Thông tin giao hàng",
  "Thanh toán",
  "Thành Công",
];

const CheckoutSteps = ({ active }) => {
  return (
    <Stepper
      activeStep={active}
      className="w-[90%] 800px:w-[60%] mx-auto"
      connector={<QontoConnector />}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepButton color="inherit">{label}</StepButton>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutSteps;
