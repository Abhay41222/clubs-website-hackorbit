export function getEnv(variable: string): string {
  const value = import.meta.env[variable];
  if (value === undefined) {
    throw new Error(`Environment variable ${variable} is not defined`);
  }
  return value;
}