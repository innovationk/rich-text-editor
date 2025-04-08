import { RichText } from ".";

export default function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
        boxSizing: "border-box",
        border: "1px dotted blue",
      }}
    >
      <RichText label="test label" initValue="toto" />
    </div>
  );
}
