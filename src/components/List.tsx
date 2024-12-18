import { useState, useMemo } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  TextField,
  Divider,
} from "@mui/material";

interface GenericListProps<T> {
  title: string;
  items: T[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  filterKeys: (keyof T)[];
  getItemId: (item: T) => number;
  getItemLabel: (item: T) => string;
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

  // Filter logic using useMemo
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      filterKeys.some((key) => {
        const value = item[key];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [items, filterKeys, searchTerm]);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Title */}
      <Typography
        variant="h4"
        textAlign="center"
        fontFamily="Rubik"
        fontSize={30}
        marginBottom={2}
      >
        {title}
      </Typography>

      {/* Search Field */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 3,
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <TextField
          label={`Buscar ${title.toLowerCase()}`}
          variant="outlined"
          fullWidth
          sx={{ maxWidth: "70%" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="outlined"
            onClick={() => setSearchTerm("")}
            color="secondary"
          >
            Limpiar
          </Button>
        )}
      </Box>

      {/* List or No Results */}
      {filteredItems.length > 0 ? (
        <List
          sx={{
            maxWidth: "80%",
            margin: "0 auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          {filteredItems.map((item, index) => (
            <Box key={getItemId(item)}>
              <ListItem
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
                sx={{
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemText primary={getItemLabel(item)} />
              </ListItem>
              {index < filteredItems.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      ) : (
        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{ marginTop: 2 }}
        >
          No se encontraron resultados.
        </Typography>
      )}
    </Box>
  );
}

export default GenericList;
