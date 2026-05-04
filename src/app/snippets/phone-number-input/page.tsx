"use client";

import React from "react";
import PhoneNumberInput from "@/components/phone-number-input";

export default function Page() {
  const [val, setVal] = React.useState("");
  const [country, setCountry] = React.useState<import("@/components/phone-number-input/countries").Country | undefined>(undefined);

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">PhoneNumberInput — demo</h1>

      <div className="mb-6">
        <div className="text-sm text-slate-600 mb-2">Controlled</div>
        <PhoneNumberInput
          value={val}
          onChange={(d) => setVal(d)}
          country={country}
          onCountryChange={(c) => setCountry(c)}
          placeholder="Enter digits"
        />
        <div className="mt-2 text-xs text-slate-500">Value: {val}</div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-slate-600 mb-2">Only show a small set (US/GB/SG/IN)</div>
        <PhoneNumberInput defaultValue="" defaultCountry="US" onlyCountries={["US","GB","SG","IN"]} />
      </div>

      <div>
        <div className="text-sm text-slate-600 mb-2">Uncontrolled (full list)</div>
        <PhoneNumberInput defaultValue="" defaultCountry="US" />
      </div>

      <section className="mt-8 border-t pt-6">
        <h2 className="text-base font-semibold mb-3">Usage & props</h2>
        <p className="text-sm text-slate-600 mb-3">
          The component returns digits-only values (no +). Use `onCountryChange` to read the selected dial.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Quick example</h3>
            <pre className="bg-slate-100 p-3 rounded text-xs overflow-auto">
{`<PhoneNumberInput
  value={digits}
  onChange={setDigits}
  country={country}
  onCountryChange={setCountry}
  placeholder="Mobile number"
/>`}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Available props</h3>
            <ul className="text-sm text-slate-700 list-disc list-inside">
              <li><strong>value</strong> — controlled digits-only value</li>
              <li><strong>defaultValue</strong> — uncontrolled initial value</li>
              <li><strong>onChange</strong> — <code>(digits) =&gt; void</code></li>
              <li><strong>country / defaultCountry</strong> — selected country (object or ISO2 string)</li>
              <li><strong>onlyCountries</strong> — restrict the picker by ISO2 codes</li>
              <li><strong>inputClassName</strong> / <strong>className</strong> — styling hooks</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
