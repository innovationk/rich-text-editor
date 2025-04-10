import useEnrichment from "./useEnrichment";
import TextDecorator from "./TextDecorator";

export default function Italic() {
  const enrich = useEnrichment();

  return (
    <TextDecorator cb={() => enrich("fontStyle", "italic")}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 3H20M4 21H14M15 3L9 21"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </TextDecorator>
  );
}
