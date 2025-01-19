import { styled, Typography } from "@mui/material";
import { UserProfile } from "./components/UserProfile";
import { ControlledInput } from "./components/ControlledInput";
import { UniversalDialog } from "./components/UniversalDialog";

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

  const handleConfirm = () => {
    alert("Действие подтверждено!");
  };

  const handleClose = () => {
    console.log("Диалог закрыт");
  };

  return (
    <MainWrapper>
      <Typography variant="h3" component="h1" gutterBottom>
        Профиль пользователя.
      </Typography>

      <UserProfile userId={1} />

      <Typography variant="h3" component="h1" gutterBottom>
        Управляемый инпут.
      </Typography>

      <ControlledInput
        label="Введите текст"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        initialValue=""
      />

      <Typography variant="h3" component="h1" gutterBottom>
        Универсальное модальное окно.
      </Typography>

      <UniversalDialog
        title="Подтвердите действие"
        content={
          <Typography>
            Вы уверены, что хотите выполнить это действие?
          </Typography>
        }
        onClose={handleClose}
        onConfirm={handleConfirm}
        confirmText="Подтвердить"
        cancelText="Отменить"
        triggerButtonText="Открыть диалог"
      />
    </MainWrapper>
  );
}

export default App;
