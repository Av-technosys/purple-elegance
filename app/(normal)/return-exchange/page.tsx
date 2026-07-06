import PolicyPage from "@/components/PolicyPage";
import { getPolicyData } from "@/data/policyData";

export default function ReturnExchangePage() {
  const policy = getPolicyData("return-exchange");

  if (!policy) {
    return <div>Policy not found</div>;
  }

  return <PolicyPage policy={policy} />;
}
