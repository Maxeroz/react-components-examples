import { styled } from "@mui/material";
import { UserProfile } from "./components/UserProfile";
import { ControlledInput } from "./components/ControlledInput";

const MainWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

function App() {
  const handleInputChange = (value: string) => {
    console.log("Измененное значение:", value);
  };

  const handleInputBlur = (value: string) => {
    console.log("Значение при потере фокуса:", value);
    alert(`Вы ввели: ${value}`);
  };

  return (
    <MainWrapper>
      <h1>Профиль пользователя</h1>
      <UserProfile userId={1} />

      <ControlledInput
        label="Введите текст"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        initialValue=""
      />
    </MainWrapper>
  );
}

export default App;
