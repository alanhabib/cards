import { GlobalStyle } from "./styling/globalStyling";
import { JackInTheBox } from "react-awesome-reveal";
import Cards from "./cards";

function App() {
  return (
    <JackInTheBox triggerOnce>
      <GlobalStyle />
      <Cards />
    </JackInTheBox>
  );
}

export default App;
