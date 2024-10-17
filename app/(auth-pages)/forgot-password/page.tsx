import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Resetování hesla</h1>
          <p className="text-sm text-secondary-foreground">
            Už máte účet?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Přihlášení
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="Váš email" required />
          <SubmitButton formAction={forgotPasswordAction}>
            Resetování hesla
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
     
    </>
  );
}
