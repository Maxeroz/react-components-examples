import { styled } from "@mui/material";
import { UserProfile } from "./components/UserProfile";

const MainWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

function App() {
  return (
    <MainWrapper>
      <h1>Профиль пользователя</h1>
      <UserProfile userId={1} />
    </MainWrapper>
  );
}

export default App;
