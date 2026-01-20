export {};

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...params: any[]) => void;
  }
}
