import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card,CardHeader } from "@/Components/ui/card";
import {Toaster,toast} from "sonner" ;
 import { z } from "zod";
 import { zodResolver } from "@hookform/resolvers/zod";
    import { useForm } from "react-hook-form"; 
import { router } from "@inertiajs/react";
    // im[ort router]

    
 const SignUpSchema = z.object({
    email:z.string().email("Invalid email address")
                    .min(5,"Email is required")
                    .max(30,"Email is too long"),
    password:z.string().min(8,"Password is required")
                       .max(20,"Password is too long"),
});
export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    //setting the hardcode message for the email and password that will be used to check the validation
    const backendEmail="joy@gmail.com";
    const backendPassword="password123";

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData= {email,password};
        const result = SignUpSchema.safeParse(formData);
        if (formData.email === backendEmail && formData.password === backendPassword) {
            toast.success("Sign Up successful!");
            setMessage("Sign Up successful!");
            router.visit("/dashboard");
        }
        else if(formData.email !== backendEmail && formData.password !== backendPassword){
            toast.error("Sign Up failed!");
            setMessage("Sign Up failed!");
        }
        else{
            result.error.errors.forEach(err=>{
                toast.error(err.message);
            });
            setMessage("Please fill in all the fields correctly.");

        }
           
        // } else {
        //     toast.success("Sign Up successful!");
        //     setMessage("Sign Up successful!");

        // }
        // Proceed with form submission
    };
    const isFormIncomplete=!email||!password;

    return(
        <div className="flex flex-col items-center justify-center max-width -min-h-screen py-6 bg-gray-100">
            <Card className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
                <CardHeader className="text-center font-bold text-black text-lg">Sign Up</CardHeader>
                {/* ensure to add handleSubmit to the form tag */}
         <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <Label className="font-medium text-gray-700">Email</Label>
                <Input type="email" placeholder="Enter your Email" className="mt-1" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <Label className="font-medium text-gray-700">Password</Label>
                <Input type="password" placeholder="Enter your Password" className="mt-1" onChange={e => setPassword(e.target.value)}/>
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" disabled={isFormIncomplete}>Sign Up

            </Button>
                {message && (
                   <p className={`text-sm mt-2 ${message === 'Sign in successful!' ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
                )}
             </form>
                <Toaster richColors position="top-right" expand={true} />
    
                </Card>

        </div>
    );
}

