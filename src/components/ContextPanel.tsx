import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Pencil } from "lucide-react";
import type { ContextEntry } from "@/types/context";

interface ContextPanelProps {
  contexts: ContextEntry[];
  onAdd: (key: string, content: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, key: string, content: string) => void;
}

const ContextPanel = ({ contexts, onAdd, onDelete, onUpdate }: ContextPanelProps) => {
  const [keyValue, setKeyValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingKey, setEditingKey] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyValue.trim() || !contentValue.trim()) return;
    onAdd(keyValue.trim(), contentValue.trim());
    setKeyValue("");
    setContentValue("");
  };

  const startEdit = (ctx: ContextEntry) => {
    setEditingId(ctx.id);
    setEditingKey(ctx.key);
    setEditingContent(ctx.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingKey("");
    setEditingContent("");
  };

  const handleSaveEdit = () => {
    if (!editingId || !editingKey.trim() || !editingContent.trim()) return;
    onUpdate(editingId, editingKey.trim(), editingContent.trim());
    cancelEdit();
  };

  return (
    <Card className="max-w-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Contexto para IA</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Adicione palavras‑chave e descrições que ajudam a IA a entender melhor seu contexto
          pessoal ou do projeto.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Palavra-chave (ex: Outlier, Chiara, Mãe)"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
            />
          </div>
          <Textarea
            placeholder="Conteúdo (ex: plataforma de freelance para ganhar dinheiro em dólar)"
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
            rows={3}
          />
          <Button
            type="submit"
            size="sm"
            className="w-full"
            disabled={!keyValue.trim() || !contentValue.trim()}
            onClick={handleAdd}
          >
            Adicionar contexto
          </Button>
        </div>

        {contexts.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            {contexts.map((ctx) => {
              const isEditing = editingId === ctx.id;

              return (
                <div
                  key={ctx.id}
                  className="rounded-md border bg-card/60 px-3 py-2 flex flex-col gap-2 text-xs"
                >
                  {isEditing ? (
                    <>
                      <Input
                        value={editingKey}
                        onChange={(e) => setEditingKey(e.target.value)}
                        className="h-7 text-xs"
                      />
                      <Textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={3}
                        className="text-xs"
                      />
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
                          disabled={!editingKey.trim() || !editingContent.trim()}
                        >
                          Salvar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold truncate">{ctx.key}</div>
                        <div className="text-muted-foreground line-clamp-2 mt-0.5">
                          {ctx.content}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(ctx)}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          aria-label="Editar contexto"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(ctx.id)}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                          aria-label="Remover contexto"
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

export default ContextPanel;

