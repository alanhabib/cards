import styled from "styled-components";

const ToDoTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 512px;
  height: 768px;
  position: relative;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin: 0 auto;
  padding: 20px;
`;

const ToDoTemplate = ({ children }) => {
  return <ToDoTemplateBlock>{children}</ToDoTemplateBlock>;
};

export default ToDoTemplate;
