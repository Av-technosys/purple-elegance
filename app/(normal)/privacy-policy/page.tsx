import PolicyPage from "@/components/PolicyPage";
import { getPolicyData } from "@/data/policyData";

export default function PrivacyPolicyPage() {
  const policy = getPolicyData("privacy-policy");

  if (!policy) {
    return <div>Policy not found</div>;
  }

  return <PolicyPage policy={policy} />;
}
