import { Switch } from "@/components/ui/switch";
import {
  useActiveStatusMutation,
  useDriverInfoQuery,
} from "@/redux/features/driver/driver.api";
import { useEffect, useId, useState } from "react";

export default function ActiveStatusSwitch() {
  const id = useId();

  const { data: activeData, isLoading } = useDriverInfoQuery(undefined);

  const [activeStatusSwitch] = useActiveStatusMutation();
  const [checked, setChecked] = useState(null);

  // useEffect(() => {
  //   if (activeData?.data?.[0].isOnline !== undefined) {
  //     setChecked(activeData?.data?.[0].isOnline);
  //   }
  // }, [activeData]);

  const toggleSwitch = async (value: boolean) => {
    setChecked(value);
    try {
      await activeStatusSwitch({ isOnline: value }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
      setChecked(!value);
    }
  };

  if (!isLoading) return <p>Loading...</p>;

  return (
    <div
      className="group inline-flex items-center gap-2"
      data-state={checked ? "checked" : "unchecked"}
    >
      <span
        id={`${id}-off`}
        className="group-data-[state=checked]:text-muted-foreground/70 flex-1 cursor-pointer text-right text-sm font-medium"
        aria-controls={id}
        onClick={() => toggleSwitch(false)}
      >
        Off
      </span>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={toggleSwitch}
        aria-labelledby={`${id}-off ${id}-on`}
      />
      <span
        id={`${id}-on`}
        className="group-data-[state=unchecked]:text-muted-foreground/70 flex-1 cursor-pointer text-left text-sm font-medium"
        aria-controls={id}
        onClick={() => toggleSwitch(true)}
      >
        On
      </span>
    </div>
  );
}
