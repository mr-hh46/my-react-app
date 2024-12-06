import "./App.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "./AuthProvider.tsx";

const App = () => {
  const formSchema = z.object({
    username: z.string().min(1, {
      message: "Username is blank.",
    }),
    password: z.string().min(1, {
      message: "Password is blank.",
    }),
  });

  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const { login } = useAuth();
  let navigate = useNavigate();

  function onSubmit(values: FormValues) {
    login();
    console.log(values);
    navigate("/mainpage", { replace: true });
  }

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 login-page">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={`${import.meta.env.BASE_URL}/mark.svg?color=indigo&shade=500`}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex text-sm/6 font-medium text-inherit">
                      User ID
                    </FormLabel>
                    <FormControl>
                      <Input className="w-full pr-9" {...field} />
                    </FormControl>
                    <FormMessage className="flex text-inherit" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex text-sm/6 font-medium text-inherit">
                      Password
                    </FormLabel>
                    <div className="mt-2 relative w-full max-w-sm">
                      <FormControl>
                        <Input
                          id="txtPassword"
                          className="w-full pr-9"
                          type={isVisible ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <FormControl>
                        <Button
                          id="btnPassword"
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeOff
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ) : (
                            <Eye size={16} strokeWidth={2} aria-hidden="true" />
                          )}
                        </Button>
                      </FormControl>
                    </div>
                    <FormMessage className="flex text-inherit" />
                  </FormItem>
                )}
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default App;
