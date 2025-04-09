import React from 'react';
import styles from './RichTextEditor.module.css';

/**
 * RichTextEditor Component
 * @param {Object} props - The component props.
 * @param {string} props.initValue - The initial value to display in the editor.
 */
const RichTextEditor = ({
    initValue = "RichTextEditor"
}) => {
    return <div className={styles.richtexteditor}>{initValue}</div>;
};

export default RichTextEditor;