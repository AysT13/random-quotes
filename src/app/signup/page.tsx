import AuthButton from "@/components/AuthButton";
import AuthCard from "@/components/AuthCard";
import AuthTitle from "@/components/AuthTitle";
import FormField from "@/components/FormField";

export default function SignUpPage() {
  return (
    <AuthCard>
      <AuthTitle>Sign Up</AuthTitle>
      <form>
        <FormField id="email" label="Email" type="email" />
        <FormField id="password" label="Password" type="password" />
        <AuthButton label="Sign Up" />
      </form>
    </AuthCard>
  );
}
