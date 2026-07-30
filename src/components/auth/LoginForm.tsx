import { useState, type FormEvent } from "react";
import Button from "../ui/Button";

interface LoginFormProps {
  isLoading?: boolean;
  error?: string | null;

  onLogin: (credentials: {
    userName: string;
    pass: string;
  }) => Promise<void>;
}

export default function LoginForm({
  isLoading = false,
  error = null,
  onLogin,
}: LoginFormProps) {

  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await onLogin({
      userName,
      pass,
    });
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="
        flex-1
        px-6
        py-8
        flex
        flex-col
        gap-6
      "
    >

      <div>

        <label
          htmlFor="userName"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Usuario
        </label>

        <input
          id="userName"
          autoComplete="username"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="
            w-full
            border-b-2
            border-amber-700/40
            bg-transparent
            px-1
            py-2
            outline-none
            focus:border-amber-700
          "
        />

      </div>

      <div>

        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="
            w-full
            border-b-2
            border-amber-700/40
            bg-transparent
            px-1
            py-2
            outline-none
            focus:border-amber-700
          "
        />

      </div>

      {error && (

        <div
          className="
            rounded-md
            border
            border-red-300
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
          "
        >
          {error}
        </div>

      )}

     <Button
  type="submit"
  disabled={isLoading}
>
  {isLoading ? "Ingresando..." : "Entrar"}
</Button>
    </form>
  );
}