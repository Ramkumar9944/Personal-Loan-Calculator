import React from "react";
import { useState } from "react";
import EMICalculation from "./EMICalculation";
import "./EMIInputForm.css";
const EMIInputForm: React.FC = () => {
  const [principalSliderValue, setSliderPrincipalValue] = useState(500000);
  const [principalInputValue, setPrincipalInputValue] = useState(500000);
  const [principalInputStyle, setPrincipalInputStyle] =
    useState("principal-input");
  const [tenureSliderValue, setSliderTenureValue] = useState(5);
  const [tenureInputValue, setTenureInputValue] = useState(5);
  const [tenureInputStyle, setTenureInputStyle] = useState("tenure-input");
  const [interestSliderValue, setSliderInterestValue] = useState(10);
  const [interestInputValue, setInterestInputValue] = useState(10);
  const [interestInputStyle, setInterestInputStyle] =
    useState("interest-input");
  const [emi, setEMI] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [clicked, setClicked] = useState(false);

  const principalSliderChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSliderPrincipalValue(parseInt(event.target.value));
    setPrincipalInputValue(parseInt(event.target.value));
  };
  const principalInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrincipalInputValue(parseInt(event.target.value));
    setSliderPrincipalValue(parseInt(event.target.value));
  };

  const tenureSliderChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSliderTenureValue(parseInt(event.target.value));
    setTenureInputValue(parseInt(event.target.value));
  };

  const tenureInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTenureInputValue(parseInt(event.target.value));
    setSliderTenureValue(parseInt(event.target.value));
  };

  const interestSliderChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSliderInterestValue(parseFloat(event.target.value));
    setInterestInputValue(parseFloat(event.target.value));
  };

  const interestInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInterestInputValue(parseFloat(event.target.value));
    setSliderInterestValue(parseFloat(event.target.value));
  };

  const SubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (principalInputValue > 4000000 || principalInputValue < 50000) {
      setPrincipalInputStyle("principal-input-invalid");
      setClicked(false);
      return;
    } else if (interestInputValue > 21 || interestInputValue < 10) {
      setInterestInputStyle("interest-input-invalid");
      setClicked(false);
      return;
    } else if (tenureInputValue > 5 || tenureInputValue < 1) {
      setTenureInputStyle("tenure-input-invalid");
      setClicked(false);
      return;
    } else {
      let monthlyInterest = interestInputValue / 12 / 100;
      let months = tenureInputValue * 12;
      let numerator: number =
        principalInputValue * monthlyInterest * (1 + monthlyInterest) ** months;
      let denominator: number = (1 + monthlyInterest) ** months - 1;
      const total_pay = (numerator / denominator) * months;
      const total_interest = total_pay - principalInputValue;
      setEMI(numerator / denominator);
      setClicked(true);
      setTotalPay(total_pay);
      setTotalInterest(total_interest);
      setPrincipalInputStyle("principal-input");
      setInterestInputStyle("interest-input");
      setTenureInputStyle("tenure-input");
    }
  };
  return (
    <form>
      <div className="card">
        <div className="card-contents">
          <div className="principal">
            <div className="principal-label">
              <label>Amount you need (₹)</label>
              <input
                className={principalInputStyle}
                type="number"
                value={principalInputValue}
                onChange={principalInputChangeHandler}
              />
            </div>
            <input
              className="personal-loan-slider"
              type="range"
              value={principalSliderValue}
              step={10000}
              min={50000}
              max={4000000}
              onChange={principalSliderChangeHandler}
            />
            <div className="principal-range">
              <p>₹50,000</p>
              <p>₹40,00,000</p>
            </div>
          </div>
          <div className="tenure">
            <div className="tenure-label">
              <label>for</label>
              <input
                className={tenureInputStyle}
                type="number"
                value={tenureInputValue}
                onChange={tenureInputChangeHandler}
              />
              <label>years</label>
            </div>
            <input
              className="tenure-slider"
              type="range"
              value={tenureSliderValue}
              min={1}
              max={5}
              onChange={tenureSliderChangeHandler}
            />
            <div className="tenure-range">
              <p>1 Year</p>
              <p>5 Years</p>
            </div>
          </div>
          <div className="interest">
            <div className="interest-label">
              <label>Interest rate</label>
              <input
                className={interestInputStyle}
                type="number"
                value={interestInputValue}
                onChange={interestInputChangeHandler}
              />
              <label>%</label>
            </div>
            <input
              className="interest-slider"
              type="range"
              value={interestSliderValue}
              step={0.1}
              min={10}
              max={21}
              onChange={interestSliderChangeHandler}
            />
            <div className="interest-range">
              <p>10%</p>
              <p>21%</p>
            </div>
          </div>
        </div>
        <button onClick={SubmitHandler}>Calculate</button>
        <EMICalculation
          monthly_emi={emi}
          clicked={clicked}
          total_pay={totalPay}
          total_interest={totalInterest}
        />
      </div>
    </form>
  );
};
export default EMIInputForm;
