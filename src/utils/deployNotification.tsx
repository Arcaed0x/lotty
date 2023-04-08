import { ReactNode } from "react";
import toast from "react-hot-toast";
import Notification from "@/components/Atoms/Notification";

export const deployNotification = (
  children: ReactNode,
  duration: number = 5000,
  type: string
) => {
  toast.custom(
    (t) => (
      <Notification
        onDelete={() => toast.dismiss(t.id)}
        type={type}
        visible={t.visible}
      >
        {children}
      </Notification>
    ),
    { position: "bottom-center", duration }
  );
};
