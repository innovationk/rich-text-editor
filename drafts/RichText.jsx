import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

function RichText({ content, classNames="" }) {
    const sanitizedContent = DOMPurify.sanitize(content);
    
    return (
    <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        className={`${classNames}`}
        style={{
            whiteSpace: 'pre-wrap',
        }}
    />
    );
}
RichText.propTypes = {
    content: PropTypes.string,
    classNames: PropTypes.string,
};
export default RichText;