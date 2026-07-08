import PolicyPage from "@/components/PolicyPage";
import { getPolicyData } from "@/data/policyData";

export default function TermsOfUsePage() {
  const policy = getPolicyData("terms-of-use");

  if (!policy) {
    return <div>Policy not found</div>;
  }

  return <PolicyPage policy={policy} />;
}
