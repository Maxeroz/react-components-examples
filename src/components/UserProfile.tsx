import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export const UserProfile = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Пользователь не найден");
        }
        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: 2 }}>
        <AlertTitle>Ошибка</AlertTitle>
        {error}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert severity="warning" sx={{ margin: 2 }}>
        <AlertTitle>Внимание</AlertTitle>
        Пользователь не найден
      </Alert>
    );
  }

  return (
    <Card sx={{ maxWidth: 400, margin: "20px auto", padding: 2 }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          <strong>Телефон:</strong> {user.phone}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          <strong>Вебсайт:</strong> {user.website}
        </Typography>
      </CardContent>
    </Card>
  );
};
