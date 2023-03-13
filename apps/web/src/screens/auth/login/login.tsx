import { Button } from "ui";

export function LoginScreen() {
  return (
    <div>
      Login Screen <Button text="Login" onClick={() => console.log("Login")} />
    </div>
  );
}
