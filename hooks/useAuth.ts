import useAuthStore from "@/store/useAuthStore";

export const AuthHook = async () => {
  const { user, token } = await useAuthStore();
  return { user, token };
};
