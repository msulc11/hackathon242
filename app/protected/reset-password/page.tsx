import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Resetování hesla</h1>
      <p className="text-sm text-foreground/60">
        Prosím, vložte nové heslo níže.
      </p>
      <Label htmlFor="password">Nové heslo</Label>
      <Input
        type="password"
        name="password"
        placeholder="Nové heslo"
        required
      />
      <Label htmlFor="confirmPassword">Potvrzení hesla</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Potvrzení hesla"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        Resetování hesla
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
