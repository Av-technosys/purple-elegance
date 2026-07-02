import { DashboardHeader } from "./DashboardHeader"
import { SettingsForm } from "./SettingsForm"

export function DashboardSettings() {
  return (
    <>
      <DashboardHeader
        title="Account Settings"
        description="Update your personal information, password, and communication preferences."
      />
      <SettingsForm />
    </>
  )
}
