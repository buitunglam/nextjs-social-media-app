"use client";

import { LoginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validation";
import { login } from "./actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/LoadingButton";
import { PasswordInput } from "@/components/PaswordInput";

const LoginForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (value: LoginValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await login(value);
      if (error) setError(error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="text-destructive text-center">{error}</p>}
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              {form.formState.errors.userName && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.userName.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              {form.formState.errors.password && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.password.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isPending}
          disabled={isPending}
          // type="submit"
          className="w-full bg-[#22c55e] hover:bg-green-400"
        >
          Create Account
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
