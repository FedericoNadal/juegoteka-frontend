
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

    const [mesVisible, setMesVisible] = useState(new Date());
    const [diaSeleccionado, setDiaSeleccionado] = useState(new Date());

    const inicioGrilla = startOfWeek(startOfMonth(mesVisible), {
        weekStartsOn: 1
    });

    const finGrilla = endOfWeek(endOfMonth(mesVisible), {
        weekStartsOn: 1
    });

    const dias = eachDayOfInterval({
        start: inicioGrilla,
        end: finGrilla
    });

    const mesAnterior = subMonths(mesVisible, 1);
    const mesSiguiente = addMonths(mesVisible, 1);

    const tieneJornadasEnMes = (mes: Date) =>
        jornadas.some((jornada) =>
            isSameMonth(new Date(jornada.fechaHora), mes)
        );

    const cambiarMes = (mes: Date) => {
        setMesVisible(mes);
        setDiaSeleccionado(startOfMonth(mes));
    };

    const jornadasDelDia = (dia: Date) =>
        jornadas.filter((jornada) =>
            isSameDay(new Date(jornada.fechaHora), dia)
        );

    return (
        <section className="rounded-xl bg-white p-4 shadow">

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

            <div className="grid grid-cols-7 gap-1">
                {["L", "M", "X", "J", "V", "S", "D"].map((dia) => (
                    <div
                        key={dia}
                        className="py-2 text-center text-sm font-semibold text-stone-500"
                    >
                        {dia}
                    </div>
                ))}

                {dias.map((dia) => {
    const jornadasDia = jornadasDelDia(dia);

    return (
        <div
            key={dia.toISOString()}
            className={`
                min-h-16 rounded-lg border p-2
                ${!isSameMonth(dia, mesVisible)
                    ? "text-stone-300 bg-stone-50"
                    : "text-stone-700"}
                ${isSameDay(dia, diaSeleccionado)
                    ? "border-amber-500 bg-amber-100"
                    : "border-stone-200"}
            `}
        >
            <button
                type="button"
                onClick={() => setDiaSeleccionado(dia)}
                className="text-sm font-semibold"
            >
                {format(dia, "d")}
            </button>

            <div className="mt-1 flex flex-col gap-1">
               {jornadasDia.map((jornada) => {
    const esPropia =
        String(jornada.Juegoteka.id) === String(usuario.id);

    const estaInscripto = idsInscripto.includes(jornada._id);

    return (
        <button
            key={jornada._id}
            type="button"
            onClick={() => onSeleccionarJornada(jornada)}
            className={`
                hidden sm:block truncate rounded
                px-1 py-0.5 text-left text-xs
                ${esPropia
                    ? "bg-stone-200 text-stone-800 hover:bg-stone-300"
                    : estaInscripto
                        ? "bg-amber-300 text-amber-950 hover:bg-amber-400"
                        : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                }
            `}
            title={jornada.nombre}
        >
            {format(new Date(jornada.fechaHora), "HH:mm")}{" "}
            {jornada.nombre}
        </button>
    );
})}
                {jornadasDia.length > 0 && (
                    <span className="flex gap-1 sm:hidden">
                        {jornadasDia.slice(0, 3).map((jornada) => (
                            <span
                                key={jornada._id}
                                className="h-1.5 w-1.5 rounded-full bg-amber-600"
                            />
                        ))}
                    </span>
                )}
            </div>
        </div>
    );
})}

            </div>

        <div className="mt-5 border-t border-stone-200 pt-4">
    <h3 className="mb-3 font-semibold text-stone-800">
        {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es })}
    </h3>

    {jornadasDelDia(diaSeleccionado).length === 0 ? (
        <p className="text-sm text-stone-500">
            No hay jornadas programadas para este día.
        </p>
    ) : (
        <div className="flex flex-col gap-2">
            {jornadasDelDia(diaSeleccionado).map((jornada) => (
                <button
                    key={jornada._id}
                    type="button"
                    onClick={() => onSeleccionarJornada(jornada)}
                    className="
                        rounded-lg border border-amber-200
                        bg-amber-50 p-3 text-left
                        hover:bg-amber-100
                    "
                >
                    <span className="block font-semibold text-stone-800">
                        {jornada.nombre}
                    </span>

                    <span className="text-sm text-stone-600">
                        {format(new Date(jornada.fechaHora), "HH:mm")}
                        {" · "}
                        {jornada.Juegoteka.nombre}
                    </span>
                </button>
            ))}
        </div>
    )}
</div>


        </section>
    );
}

export default JornadasCalendar;