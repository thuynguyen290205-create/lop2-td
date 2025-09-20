import { useEffect, useRef } from 'react';

const MathRenderer = ({ children, inline = false }) => {
  const mathRef = useRef(null);

  useEffect(() => {
    if (window.MathJax && mathRef.current) {
      // Xóa nội dung cũ
      mathRef.current.innerHTML = children;
      
      // Render lại MathJax
      window.MathJax.typesetPromise([mathRef.current]).catch((err) => {
        console.log('MathJax rendering error:', err);
      });
    }
  }, [children]);

  return (
    <span 
      ref={mathRef}
      className={inline ? 'math-inline' : 'math-display'}
      style={{
        display: inline ? 'inline' : 'block',
        textAlign: inline ? 'inherit' : 'center',
        margin: inline ? '0' : '10px 0'
      }}
    >
      {children}
    </span>
  );
};

export default MathRenderer;

