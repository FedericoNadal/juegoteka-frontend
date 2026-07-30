interface AuthFooterProps {
  onRegister?: () => void;
}

export default function AuthFooter({
  onRegister,
}: AuthFooterProps) {

  return (

    <footer
      className="
        border-t
        border-amber-900/20
        px-6
        py-5
      "
    >

      <p className="text-sm text-stone-600">

        ¿Primera partida?

      </p>

      <button
        type="button"
        onClick={onRegister}
        className="
          mt-2
          text-sm
          font-medium
          text-amber-800
          hover:underline
        "
      >
        Crear una cuenta
      </button>

    </footer>

  );
}