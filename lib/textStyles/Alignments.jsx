import useToggleStyle from "./useToggleStyle";
import TextStyle from "./TextStyle";

const ALIGNMENT_TYPE = ["left", "center", "right", "justify"];
const ALIGNMENT_IMG = {
  left: (
    <svg
      fill="#000000"
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <rect y="38.957" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="139.13" width="400.696" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="239.304" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="439.652" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="339.478" width="400.696" height="33.391" />
        </g>
      </g>
    </svg>
  ),
  center: (
    <svg
      fill="#000000"
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <rect y="38.957" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect x="55.652" y="139.13" width="400.696" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="239.304" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="439.652" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect x="55.652" y="339.478" width="400.696" height="33.391" />
        </g>
      </g>
    </svg>
  ),
  right: (
    <svg
      fill="#000000"
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <rect y="38.957" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect x="111.304" y="139.13" width="400.696" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="239.304" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="439.652" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect x="111.304" y="339.478" width="400.696" height="33.391" />
        </g>
      </g>
    </svg>
  ),
  justify: (
    <svg
      fill="#000000"
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <rect y="38.957" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="139.13" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="239.304" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="439.652" width="512" height="33.391" />
        </g>
      </g>
      <g>
        <g>
          <rect y="339.478" width="512" height="33.391" />
        </g>
      </g>
    </svg>
  ),
};

export default function Alignments() {
  const toggleStyle = useToggleStyle();

  return ALIGNMENT_TYPE.map((alignment) => (
    <TextStyle
      key={alignment}
      cb={() => toggleStyle("textAlign", alignment, true)}
    >
      {ALIGNMENT_IMG[alignment]}
    </TextStyle>
  ));
}
