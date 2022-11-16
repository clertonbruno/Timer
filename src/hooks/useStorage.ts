export function useStorage() {
  const prefix = '@tictactimer:';
  const sufix = '-1.0.0';

  function setLocalStorage(name: string, value: string): void {
    localStorage.setItem(`${prefix}${name}${sufix}`, value);
  }

  function getLocalStorage(name: string): string | null {
    return localStorage.getItem(`${prefix}${name}${sufix}`);
  }

  return {
    setLocalStorage,
    getLocalStorage,
  };
}
