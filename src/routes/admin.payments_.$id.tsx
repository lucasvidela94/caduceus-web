import { createFileRoute } from "@tanstack/react-router";
import { AdminPaymentDetail } from "#/components/pages/admin/payment-detail";

export const Route = createFileRoute("/admin/payments_/$id")({
  component: AdminPaymentDetail,
});
