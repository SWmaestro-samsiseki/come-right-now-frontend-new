interface ErrorDTO {
  error: boolean;
  message: string;
}

interface SocketResponseDTO {
  isSuccess: boolean;
  message?: string;
}

export type { ErrorDTO, SocketResponseDTO };
