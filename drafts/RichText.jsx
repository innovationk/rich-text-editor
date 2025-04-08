import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

function DraftRichText({ content, classNames = "" }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className={`${classNames}`}
      style={{
        whiteSpace: "pre-wrap",
      }}
    />
  );
}
DraftRichText.propTypes = {
  content: PropTypes.string,
  classNames: PropTypes.string,
};
export default DraftRichText;