import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil } from "lucide-react";
import type { Category } from "@/types/category";

interface CategoryPanelProps {
  categories: Category[];
  onAdd: (name: string, color: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string, color: string) => void;
}

const CategoryPanel = ({ categories, onAdd, onDelete, onUpdate }: CategoryPanelProps) => {
  const [nameValue, setNameValue] = useState("");
  const [colorValue, setColorValue] = useState("#3b82f6");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingColor, setEditingColor] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameValue.trim()) return;
    onAdd(nameValue.trim(), colorValue);
    setNameValue("");
    setColorValue("#3b82f6");
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setEditingColor(category.color);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setEditingColor("");
  };

  const handleSaveEdit = () => {
    if (!editingId || !editingName.trim()) return;
    onUpdate(editingId, editingName.trim(), editingColor);
    cancelEdit();
  };

  return (
    <Card className="max-w-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Categorias</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Crie categorias para organizar suas tarefas e atribua cores a elas.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Nome da categoria"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            <input
              type="color"
              value={colorValue}
              onChange={(e) => setColorValue(e.target.value)}
              className="h-10 w-14 rounded border cursor-pointer"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="w-full"
            disabled={!nameValue.trim()}
            onClick={handleAdd}
          >
            Adicionar categoria
          </Button>
        </div>

        {categories.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            {categories.map((category) => {
              const isEditing = editingId === category.id;

              return (
                <div
                  key={category.id}
                  className="rounded-md border bg-card/60 px-3 py-2 flex flex-col gap-2 text-xs"
                >
                  {isEditing ? (
                    <>
                      <div className="flex gap-2">
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="h-7 text-xs"
                        />
                        <input
                          type="color"
                          value={editingColor}
                          onChange={(e) => setEditingColor(e.target.value)}
                          className="w-8 h-7 rounded border"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={cancelEdit}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={!editingName.trim()}
                        >
                          Salvar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: category.color }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold truncate">{category.name}</div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(category)}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          aria-label="Editar categoria"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(category.id)}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                          aria-label="Remover categoria"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryPanel;