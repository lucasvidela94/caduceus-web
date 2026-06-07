import { useMutation } from "@tanstack/react-query";
import { createPreference } from "./service";
import type { PaymentPreference } from "./types";

export const useCreatePreference = () => {
  return useMutation<PaymentPreference, Error, void>({
    mutationFn: createPreference,
  });
};
