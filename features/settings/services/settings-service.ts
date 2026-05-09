import { supabaseClient } from "@/core/config/supabase";

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  const { data, error } = await supabaseClient.auth.updateUser({
    password: newPassword,
    currentPassword: oldPassword,
  });

  if (error) {
    throw new Error(
      `There was an error updating the password: ${error.message}`,
    );
  }

  return { success: true, user: data.user };
};

export const changeUserName = async (newUserName: string) => {
  const { data, error } = await supabaseClient.auth.updateUser({
    data: { full_name: newUserName },
  });

  if (error)
    throw new Error(
      `There was an error updating the userName: ${error.message}`,
    );

  return { success: true, user: data.user };
};
