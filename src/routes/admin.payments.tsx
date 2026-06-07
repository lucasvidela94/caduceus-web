import { createFileRoute } from "@tanstack/react-router";
import { AdminPaymentsList } from "#/components/pages/admin/payments-list";

export const Route = createFileRoute("/admin/payments")({
  component: AdminPaymentsList,
});
