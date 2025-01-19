import { styled, Typography, Box } from "@mui/material";
import { UserProfile } from "./components/UserProfile";
import { ControlledInput } from "./components/ControlledInput";
import { UniversalDialog } from "./components/UniversalDialog";
import { ListComponent } from "./components/ListComponent";

const MainWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
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
      <FeatureSection>
        <Typography variant="h3" component="h1" gutterBottom>
          Профиль пользователя
        </Typography>
        <UserProfile userId={1} />
      </FeatureSection>

      <FeatureSection>
        <Typography variant="h3" component="h1" gutterBottom>
          Управляемый инпут
        </Typography>
        <ControlledInput
          label="Введите текст"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          initialValue=""
        />
      </FeatureSection>

      <FeatureSection>
        <Typography variant="h3" component="h1" gutterBottom>
          Универсальное модальное окно
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
      </FeatureSection>

      <FeatureSection>
        <Typography variant="h3" component="h1" gutterBottom>
          Список пользователей
        </Typography>
        <ListComponent />
      </FeatureSection>
    </MainWrapper>
  );
}

export default App;
