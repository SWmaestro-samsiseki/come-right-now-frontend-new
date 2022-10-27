interface ErrorDTO {
  error: boolean;
  message: string;
}

interface SocketResponseDTO {
  isSuccess: boolean;
  message?: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

export type { ErrorDTO, SocketResponseDTO, Category };
