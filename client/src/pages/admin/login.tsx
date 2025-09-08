import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin_token', data.token);
        setLocation('/admin/dashboard');
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to admin panel.",
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-primary mb-2">
            Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Sign in to manage your content
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              required
              data-testid="input-username"
            />
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              required
              data-testid="input-password"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={isLoading}
            data-testid="button-login"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  );
}