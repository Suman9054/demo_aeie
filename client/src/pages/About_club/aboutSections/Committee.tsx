import type { JSX } from "react";

export default function Committee(): JSX.Element {
  return (
    <div>
      <p>
        The departmental committee oversees academic quality, student activities, and
        industry collaborations.
      </p>
      <p className="mt-4">
        It consists of faculty members, student representatives, and external advisors to
        ensure holistic development.
      </p>
    </div>
  );
}
