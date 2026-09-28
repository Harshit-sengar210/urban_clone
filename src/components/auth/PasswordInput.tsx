"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showRequirements?: boolean;
}

export function PasswordInput({ showRequirements = false, className, value, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const passwordValue = (value as string) || "";
  
  const reqLength = passwordValue.length >= 8;
  const reqUpper = /[A-Z]/.test(passwordValue);
  const reqNumber = /[0-9]/.test(passwordValue);

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          className={cn("pr-10", className)}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {showRequirements && (isFocused || passwordValue.length > 0) && (
        <div className="mt-3 p-3 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-xl text-sm transition-all duration-300">
          <p className="font-semibold text-[var(--color-foreground)] mb-2 text-xs uppercase tracking-wider">
            Password requirements:
          </p>
          <ul className="space-y-1.5">
            <li className={cn("flex items-center gap-2 transition-colors", reqLength ? "text-green-600" : "text-[var(--color-muted)]")}>
              {reqLength ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              <span>At least 8 characters</span>
            </li>
            <li className={cn("flex items-center gap-2 transition-colors", reqUpper ? "text-green-600" : "text-[var(--color-muted)]")}>
              {reqUpper ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              <span>One uppercase letter</span>
            </li>
            <li className={cn("flex items-center gap-2 transition-colors", reqNumber ? "text-green-600" : "text-[var(--color-muted)]")}>
              {reqNumber ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              <span>One number</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
