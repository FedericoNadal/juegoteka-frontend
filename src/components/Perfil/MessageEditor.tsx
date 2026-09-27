import { useEffect, useState, useMemo } from "react";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { obtenerJugadores, obtenerJuegotekas } from "../../services/usuarioService";
import { enviarMensaje } from "../../services/mensajeService";
import type { Usuario } from "../../types/usuario";

interface MessageEditorProps {
  destinatarioIdInicial?: string;
}

function MessageEditor({ destinatarioIdInicial }: MessageEditorProps) {
  const { usuario, token } = useAuth();

  const [abierto, setAbierto] = useState(Boolean(destinatarioIdInicial));
  const [destinatariosPosibles, setDestinatariosPosibles] = useState<Usuario[]>([]);
  
  const [destinatariosIds, setDestinatariosIds] = useState<string[]>(
    destinatarioIdInicial ? [destinatarioIdInicial] : []
  );

  const [busqueda, setBusqueda] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (destinatarioIdInicial) {
      setDestinatariosIds([destinatarioIdInicial]);
      setAbierto(true);
    }
  }, [destinatarioIdInicial]);

  // Carga conjunta de JUGADORES y JUEGOTEKAS
  useEffect(() => {
    async function cargarTodosLosDestinatarios() {
      if (!token || !abierto) return;

      try {
        setCargandoUsuarios(true);

        // Llamamos en paralelo a ambas funciones de usuarioService
        const [jugadoresRes, juegotekasRes] = await Promise.all([
          obtenerJugadores(token),
          obtenerJuegotekas(token)
        ]);

        // Combinamos ambas listas
        const combinados = [...jugadoresRes, ...juegotekasRes];

        // Filtramos al usuario logueado para que no se mande mensajes a sí mismo
        const filtrados = combinados.filter((u) => u.id !== usuario?.id);

        setDestinatariosPosibles(filtrados);
      } catch (error) {
        console.error("No se pudieron cargar los destinatarios:", error);
      } finally {
        setCargandoUsuarios(false);
      }
    }

    cargarTodosLosDestinatarios();
  }, [token, abierto, usuario?.id]);

  // Filtrado dinámico por término de búsqueda
  const usuariosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return destinatariosPosibles;
    const term = busqueda.toLowerCase();
    return destinatariosPosibles.filter(
      (u) =>
        u.userName?.toLowerCase().includes(term) ||
        u.nombre?.toLowerCase().includes(term) ||
        u.mail?.toLowerCase().includes(term) ||
        u.rol?.toLowerCase().includes(term)
    );
  }, [destinatariosPosibles, busqueda]);

  function toggleDestinatario(id: string) {
    setDestinatariosIds((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  }

  function quitarDestinatario(id: string) {
    setDestinatariosIds((prev) => prev.filter((dId) => dId !== id));
  }

  function seleccionarTodosVisibles() {
    const idsVisibles = usuariosFiltrados.map((u) => u.id);
    const todosSeleccionados = idsVisibles.every((id) =>
      destinatariosIds.includes(id)
    );

    if (todosSeleccionados) {
      setDestinatariosIds((prev) =>
        prev.filter((id) => !idsVisibles.includes(id))
      );
    } else {
      setDestinatariosIds((prev) => Array.from(new Set([...prev, ...idsVisibles])));
    }
  }

  async function handleEnviar() {
  if (!token || !usuario) return;

  if (destinatariosIds.length === 0) {
    alert("Seleccioná al menos un destinatario.");
    return;
  }

  if (!contenido.trim()) {
    alert("Escribí un mensaje.");
    return;
  }

  // Fallback: Si no puso URL de imagen, usa la foto de perfil del remitente
  const imagenFinal = imagenUrl.trim() || usuario.foto || "";

  try {
    setEnviando(true);

    const envíos = destinatariosIds.map((destinatarioId) => {
      const payload = {
        remitente: usuario.id,
        destinatario: destinatarioId,
        contenido: contenido.trim(),
        imagen: imagenFinal,
      };

      // 🔍 LOG 1: Lo que sale del editor para este destinatario
      //console.log("📤 [EDITOR] Enviando payload a destinatario:", destinatarioId, payload);

      return enviarMensaje(payload, token);
    });

    await Promise.all(envíos);

    setContenido("");
    setImagenUrl("");
    setDestinatariosIds([]);
    setBusqueda("");
    setAbierto(false);

    alert(`Carta enviada con éxito a ${envíos.length} destinatario(s).`);
  } catch (error) {
    console.error("Error al enviar las cartas:", error);
    alert("Ocurrió un error al intentar enviar una o más cartas.");
  } finally {
    setEnviando(false);
  }
}

  const seleccionadosObjetos = useMemo(() => {
    return destinatariosPosibles.filter((u) => destinatariosIds.includes(u.id));
  }, [destinatariosPosibles, destinatariosIds]);

  return (
    <section className="rounded-xl bg-amber-50/90 border border-amber-200 shadow-md overflow-hidden transition-all">
      {/* Cabecera Desplegable */}
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        className="flex w-full items-center justify-between p-5 text-left font-title text-xl text-amber-950 hover:bg-amber-100/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          Escribir una carta
        </span>
        <span className="text-amber-700">{abierto ? "⌃" : "⌄"}</span>
      </button>

      {abierto && (
        <div className="px-5 pb-5 space-y-4">
          
          {/* SECCIÓN DESTINATARIOS */}
          <div className="space-y-2">
            <label className="block font-semibold text-amber-900 text-sm">
              Destinatarios ({destinatariosIds.length} seleccionados)
            </label>

            {/* CHIPS DE SELECCIONADOS */}
            {seleccionadosObjetos.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-amber-100/60 rounded-lg border border-amber-300/70 max-h-28 overflow-y-auto">
                {seleccionadosObjetos.map((u) => (
                  <span
                    key={u.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-800 text-amber-50 border border-amber-900 shadow-sm"
                  >
                    <span>{u.userName || u.nombre}</span>
                    <span className="text-[10px] bg-amber-950/60 text-amber-200 px-1 rounded capitalize">
                      {u.rol || "jugador"}
                    </span>
                    <button
                      type="button"
                      onClick={() => quitarDestinatario(u.id)}
                      className="text-amber-300 hover:text-white font-bold ml-1"
                      title="Quitar"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* BUSCADOR Y SELECCIÓN */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar por jugador o juegoteka..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full rounded-lg border border-amber-300 bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {usuariosFiltrados.length > 0 && (
                <button
                  type="button"
                  onClick={seleccionarTodosVisibles}
                  className="px-3 py-2 text-xs font-medium text-amber-900 bg-amber-200/80 hover:bg-amber-300 rounded-lg border border-amber-400 whitespace-nowrap"
                >
                  {usuariosFiltrados.every((u) => destinatariosIds.includes(u.id))
                    ? "Deseleccionar filtrados"
                    : "Marcar filtrados"}
                </button>
              )}
            </div>

            {/* LISTA RESULTADOS */}
            {cargandoUsuarios ? (
              <p className="text-sm text-amber-700 italic">Cargando destinatarios...</p>
            ) : (
              <div className="max-h-36 overflow-y-auto rounded-lg border border-amber-200 bg-white divide-y divide-amber-100">
                {usuariosFiltrados.length === 0 ? (
                  <p className="p-3 text-xs text-amber-700 italic">
                    No se encontraron usuarios o juegotekas que coincidan con "{busqueda}".
                  </p>
                ) : (
                  usuariosFiltrados.map((u) => {
                    const seleccionado = destinatariosIds.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => toggleDestinatario(u.id)}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          seleccionado
                            ? "bg-amber-100/80 font-semibold text-amber-950"
                            : "hover:bg-amber-50 text-amber-900"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={seleccionado}
                            onChange={() => {}} 
                            className="rounded text-amber-800 focus:ring-amber-500"
                          />
                          <span>{u.userName || u.nombre}</span>
                        </span>
                        
                        <span className="text-[10px] text-amber-700 capitalize border border-amber-300 px-1.5 py-0.5 rounded bg-amber-50">
                          {u.rol || "Jugador"}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* URL DE IMAGEN OPCIONAL */}
          <div>
            <label htmlFor="imagenUrl" className="block font-semibold text-amber-900 text-sm mb-1">
              URL de imagen en la carta (Opcional)
            </label>
            <input
              id="imagenUrl"
              type="url"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg (Si se omite, se usará tu foto de perfil)"
              className="w-full rounded-lg border border-amber-300 bg-white p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* CONTENIDO DEL MENSAJE */}
          <div>
            <textarea
              rows={5}
              value={contenido}
              onChange={(event) => setContenido(event.target.value)}
              placeholder="Escribí tu mensaje..."
              className="w-full rounded-lg border border-amber-300 bg-white p-3 text-amber-950 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* BOTÓN DE ENVÍO */}
          <div className="pt-2">
            <Button onClick={handleEnviar} disabled={enviando}>
              {enviando ? "Enviando cartas..." : "✉ Enviar carta(s)"}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default MessageEditor;