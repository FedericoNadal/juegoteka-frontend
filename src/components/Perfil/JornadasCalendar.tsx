
import { useState } from "react";
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    subMonths
} from "date-fns";
import { es } from "date-fns/locale";

import type { Jornada } from "../../types/jornada";
import type { Usuario } from "../../types/usuario";

interface JornadasCalendarProps {
    jornadas: Jornada[];
    usuario: Usuario;
    idsInscripto: string[];
    onSeleccionarJornada: (jornada: Jornada) => void;
}

function JornadasCalendar({
    jornadas,
    usuario,
    idsInscripto,
    onSeleccionarJornada
}: JornadasCalendarProps) {

    // Estado del calendario: mes que se muestra y día seleccionado.
    const [mesVisible, setMesVisible] = useState(new Date());
    const [diaSeleccionado, setDiaSeleccionado] = useState(new Date());


    // ------------------------------------------------------------
    // CÁLCULO DE LA GRILLA
    // ------------------------------------------------------------

    // Obtiene el primer y último día del mes visible.
    const inicioMes = startOfMonth(mesVisible);
    const finMes = endOfMonth(mesVisible);

    // Extiende el intervalo hasta completar semanas de lunes a domingo.
    const inicioGrilla = startOfWeek(inicioMes, { weekStartsOn: 1 });
    const finGrilla = endOfWeek(finMes, { weekStartsOn: 1 });

    // Genera un array con todas las fechas necesarias para completar la grilla.
    const dias = eachDayOfInterval({
        start: inicioGrilla,
        end: finGrilla
    });


    // ------------------------------------------------------------
    // FUNCIONES AUXILIARES
    // ------------------------------------------------------------

    // Calcula los meses anterior y siguiente al que se está mostrando.
    const mesAnterior = subMonths(mesVisible, 1);
    const mesSiguiente = addMonths(mesVisible, 1);

    // Devuelve true si el mes indicado contiene al menos una jornada.
    // Se utiliza para destacar las flechas de navegación.
    const tieneJornadasEnMes = (mes: Date) =>
        jornadas.some((jornada) =>
            isSameMonth(new Date(jornada.fechaHora), mes)
        );

    // Cambia el mes visible y selecciona su primer día.
    const cambiarMes = (mes: Date) => {
        setMesVisible(mes);
        setDiaSeleccionado(startOfMonth(mes));
    };

    // Devuelve las jornadas cuya fecha coincide con el día recibido.
    const jornadasDelDia = (dia: Date) =>
        jornadas.filter((jornada) =>
            isSameDay(new Date(jornada.fechaHora), dia)
        );

const esOrganizador = (jornada: Jornada) =>
                usuario.rol === "juegoteka" &&
                jornada.Juegoteka.id === usuario.id;

    // ------------------------------------------------------------
    // INTERFAZ DEL CALENDARIO
    // ------------------------------------------------------------

    return (
        <section className="rounded-xl bg-white p-4 shadow">

            {/* Navegación entre meses */}
            <header className="mb-5 flex items-center justify-between">

                <button
                    type="button"
                    onClick={() => cambiarMes(mesAnterior)}
                    className={`
                        rounded-lg px-3 py-2 text-xl
                        hover:bg-stone-100
                        ${tieneJornadasEnMes(mesAnterior)
                            ? "text-amber-700"
                            : "text-stone-400"}
                    `}
                    aria-label="Mes anterior"
                >
                    ‹
                </button>

                <h2 className="font-title text-xl capitalize text-stone-800">
                    {format(mesVisible, "MMMM yyyy", { locale: es })}
                </h2>

                <button
                    type="button"
                    onClick={() => cambiarMes(mesSiguiente)}
                    className={`
                        rounded-lg px-3 py-2 text-xl
                        hover:bg-stone-100
                        ${tieneJornadasEnMes(mesSiguiente)
                            ? "text-amber-700"
                            : "text-stone-400"}
                    `}
                    aria-label="Mes siguiente"
                >
                    ›
                </button>

            </header>


            {/* Grilla: encabezados de los días y celdas del calendario */}
            <div className="grid grid-cols-7 gap-1">

                {/* Encabezados de lunes a domingo */}
                {["L", "M", "X", "J", "V", "S", "D"].map((dia) => (
                    <div
                        key={dia}
                        className="py-2 text-center text-sm font-semibold text-stone-500"
                    >
                        {dia}
                    </div>
                ))}


                {/* Genera una celda para cada fecha de la grilla */}
                {dias.map((dia) => {

                    // Jornadas programadas para esta fecha.
                    const jornadasDia = jornadasDelDia(dia);
                    const tieneJornadaPropia = jornadasDia.some(esOrganizador);

                    // Determina si el usuario está inscripto en alguna de ellas.
                    const tieneInscripcion = jornadasDia.some((jornada) =>
                        idsInscripto.includes(jornada._id)
                    );

                    return (

                        <button
                            key={dia.toISOString()}
                            type="button"
                            onClick={() => setDiaSeleccionado(dia)}
                            className={`
                            min-h-16 w-full rounded-lg border p-2 text-left
                           ${tieneJornadaPropia
                                    ? "border-red-600 bg-red-100 ring-2 ring-red-500"
                                    : tieneInscripcion
                                        ? "border-emerald-600 bg-emerald-200 ring-2 ring-emerald-500"
                                        : isSameDay(dia, diaSeleccionado)
                                            ? "border-amber-600 bg-amber-100"
                                            : "border-stone-200"
                                }
                                        `}
                        >
                            {/* Número del día */}
                            <span className="text-sm font-semibold">
                                {format(dia, "d")}
                            </span>

                            {/* Indicadores de las jornadas del día */}
                            <div className="mt-2 flex flex-wrap gap-1">
                                {jornadasDia.map((jornada) => {
                                    const esPropia = esOrganizador(jornada);
                                    const estaInscripto = idsInscripto.includes(jornada._id);

                                    return (
                                        <span
                                            key={jornada._id}
                                            title={jornada.nombre}
                                            className={`h-2 w-2 rounded-full ${esPropia
                                                ? "bg-red-600"
                                                : estaInscripto
                                                    ? "bg-emerald-600"
                                                    : "bg-amber-600"
                                                }`}
                                        />
                                    );
                                })}
                            </div>
                        </button>
                    );

                })}

            </div>


            {/* ----------------------------------------------------
                DETALLE DE LAS JORNADAS DEL DÍA SELECCIONADO
            ----------------------------------------------------- */}

            <div className="mt-5 border-t border-stone-200 pt-4">

                <h3 className="mb-3 font-semibold text-stone-800">
                    {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es })}
                </h3>

                {/* Si no hay jornadas, muestra un mensaje.
                    Si las hay, genera un botón por cada una. */}
                {jornadasDelDia(diaSeleccionado).length === 0 ? (

                    <p className="text-sm text-stone-500">
                        No hay jornadas programadas para este día.
                    </p>

                ) : (

                    <div className="flex flex-col gap-2">

                        {jornadasDelDia(diaSeleccionado).map((jornada) => {

                            const estaInscripto = idsInscripto.includes(jornada._id);

                            return (
                                <button
                                    key={jornada._id}
                                    type="button"
                                    onClick={() => onSeleccionarJornada(jornada)}
                                    className={`
                                        rounded-lg border p-3 text-left transition-colors
                                        ${estaInscripto
                                            ? "border-emerald-500 bg-emerald-100 hover:bg-emerald-200"
                                            : "border-amber-200 bg-amber-50 hover:bg-amber-100"
                                        }
                                    `}
                                >

                                    <span className="block font-semibold text-stone-800">
                                        {jornada.nombre}
                                    </span>

                                    <span className="text-sm text-stone-600">
                                        {format(new Date(jornada.fechaHora), "HH:mm")}
                                        {" · "}
                                        {jornada.Juegoteka.nombre}
                                    </span>

                                    {/* Identifica las jornadas en las que ya está inscripto */}
                                    {estaInscripto && (
                                        <span className="mt-2 block text-sm font-semibold text-emerald-800">
                                            ✓ Asistiré
                                        </span>
                                    )}

                                </button>
                            );
                        })}

                    </div>
                )}

            </div>

        </section>
    );
}

export default JornadasCalendar;