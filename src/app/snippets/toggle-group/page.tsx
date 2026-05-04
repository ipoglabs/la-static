"use client";
import { useState } from "react";
import {
  ToggleButtonGroup,
  ToggleGroupButton,
} from "@/components/toggle-group/CompoundToggleGroup";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

/**
 * Toggle Group Demo — Use Cases
 *
 * 1. Single-select, mandatory (radio-like, cannot unselect last)
 * 2. Multi-select, mandatory (must select at least one, shows error)
 * 3. Disabled options (demonstrates disabling specific items)
 * 4. With icons (shows icon usage)
 */

export default function ToggleGroupDemo() {
  const [showError, setShowError] = useState(false);
  const [selected2, setSelected2] = useState<string[]>([]);

  function handleChange2(values: string[]) {
    setSelected2(values);
    if (values.length > 0) setShowError(false); // auto-clear error on selection
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-full py-16 px-4">
      <div className="w-full max-w-md flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900 mb-1">Toggle Group</h1>
          <p className="text-sm text-stone-500">Compound toggle — single/multi-select, mandatory, disabled, icons</p>
        </div>
        {/* Use case 1: Single select, cannot unselect */}
        <section className="w-full">
          <ToggleButtonGroup
            title="Single-select (mandatory)"
            singleSelect={true}
            requireSelection={true}
          >
            {["One", "Two", "Three"].map((item) => (
              <ToggleGroupButton key={item} value={item}>
                {item}
              </ToggleGroupButton>
            ))}
          </ToggleButtonGroup>
        </section>

        {/* Use case 2: Mandatory, validate button */}
        <section className="w-full">
          <ToggleButtonGroup
            title="Multi-select (must select at least one)"
            isMandatory={true}
            errorMessage="Please select at least one option."
            showError={showError}
            onChange={handleChange2}
          >
            {["One", "Two", "Three", "Four", "Five"].map((item) => (
              <ToggleGroupButton key={item} value={item}>
                {item}
              </ToggleGroupButton>
            ))}
          </ToggleButtonGroup>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => setShowError(selected2.length === 0)}
          >
            Validate
          </Button>
        </section>

        {/* Use case 3: Disabled options */}
        <section className="w-full">
          <ToggleButtonGroup
            title="With Disabled Options"
            disabledItems={["Banana", "Date"]}
          >
            {["Apple", "Banana", "Cherry", "Date", "Elderberry"].map((item) => (
              <ToggleGroupButton key={item} value={item}>
                {item}
              </ToggleGroupButton>
            ))}
          </ToggleButtonGroup>
        </section>

        {/* Use case 4: With icons */}
        <section className="w-full">
          <ToggleButtonGroup title="With Icons">
            {["Settings", "Adjust", "Tune"].map((item) => (
              <ToggleGroupButton
                key={item}
                value={item}
                icon={SlidersHorizontal}
              >
                {item}
              </ToggleGroupButton>
            ))}
          </ToggleButtonGroup>
        </section>
      </div>
    </div>
  );
}
