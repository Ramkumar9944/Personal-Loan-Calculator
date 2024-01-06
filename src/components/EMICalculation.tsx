import "./EMICalculation.css";
import PieChart from "./PieChart";
const EMICalculation: React.FC<{
  monthly_emi: number;
  clicked: boolean;
  total_pay: number;
  total_interest: number;
}> = (props) => {
  return (
    <div>
      {props.clicked && (
        <div>
          <div className="calculated-emi">
            Your Monthly EMI will be
            <span className="emi-amount">{` ₹${Math.floor(
              props.monthly_emi
            ).toLocaleString()} `}</span>
            per month
          </div>
          <PieChart amount={props.total_pay} interest={props.total_interest} />
        </div>
      )}
    </div>
  );
};
export default EMICalculation;
