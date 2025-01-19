import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

interface Item {
  id: number;
  name: string;
  email?: string;
}

export const ListComponent = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");

  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  const fetchUrl = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const data: Item[] = await response.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEdit = (item: Item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditEmail(item.email || "");
  };

  const handleSave = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: editName, email: editEmail } : item
      )
    );
    setEditId(null);
  };

  const handleAdd = () => {
    if (!newName.trim() || !newEmail.trim()) {
      alert("Поля не могут быть пустыми");
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      name: newName,
      email: newEmail,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewName("");
    setNewEmail("");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Форма добавления пользователя
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          label="Имя"
          fullWidth
        />
        <TextField
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          label="Email"
          fullWidth
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Добавить пользователя
        </Button>
      </Box>

      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                {editId === item.id ? (
                  <IconButton
                    edge="end"
                    aria-label="save"
                    onClick={() => handleSave(item.id)}
                  >
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(item)}
                  >
                    <EditIcon />
                  </IconButton>
                )}

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            {editId === item.id ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  label="Имя"
                  fullWidth
                />
                <TextField
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  label="Email"
                  fullWidth
                />
              </Box>
            ) : (
              <ListItemText
                primary={item.name}
                secondary={item.email || "Нет email"}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
