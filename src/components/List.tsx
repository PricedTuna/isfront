import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  TextField,
} from "@mui/material";

interface GenericListProps<T> {
  title: string;
  items: T[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  filterKeys: (keyof T)[]; // Keys to filter on
  getItemId: (item: T) => number; // Function to extract item ID
  getItemLabel: (item: T) => string; // Function to extract item label
}

function GenericList<T>({
  title,
  items,
  onEdit,
  onDelete,
  filterKeys,
  getItemId,
  getItemLabel,
}: GenericListProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredItems = items.filter((item) =>
    filterKeys.some((key) => {
      const value = item[key];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  return (
    <Box>
      <Typography
        variant="h4"
        textAlign="center"
        fontFamily={"Rubik"}
        fontSize={30}
        marginBottom={2}
      >
        {title}
      </Typography>

      {/* Search Field */}
      <Box textAlign="center" marginBottom={3}>
        <TextField
          label={`Buscar ${title.toLowerCase()}`}
          variant="outlined"
          fullWidth
          sx={{ maxWidth: "80%", margin: "0 auto" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {filteredItems.length > 0 ? (
        <List
          sx={{
            maxWidth: "80vh",
            margin: "0 auto",
            bgcolor: "background.paper",
          }}
        >
          {filteredItems.map((item) => (
            <ListItem
              key={getItemId(item)}
              secondaryAction={
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onEdit(item)}
                    sx={{ marginRight: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(getItemId(item))}
                  >
                    Eliminar
                  </Button>
                </Box>
              }
            >
              <ListItemText primary={getItemLabel(item)} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography textAlign="center" color="text.secondary">
          No se encontraron resultados.
        </Typography>
      )}
    </Box>
  );
}

export default GenericList;
