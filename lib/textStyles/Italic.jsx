import useToggleStyle from "./useToggleStyle";
import TextStyle from "./TextStyle";

export default function Italic() {
  const toggleStyle = useToggleStyle();

  return (
    <TextStyle cb={() => toggleStyle("fontStyle", "italic")}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 3H20M4 21H14M15 3L9 21"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </TextStyle>
  );
}
