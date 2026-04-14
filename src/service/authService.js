
export async function loginService(req) {
  const userRequest = {
    email: req.email,
    password: req.password,
  };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRequest),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.detail || "Something went wrong")
    }

    return data;

  } catch (error) {
    console.log("something error", error);
    throw error
  }
}

export const registerService = async (formData) => {
  const { email, password, fullName, birthdate } = formData;
  try {
    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ")[1] || "",
        birthDate: birthdate,
      }),
    })
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.detail || "Something went wrong")
    }
    return data
  }
  catch (error) {
    console.log("something error", error);
    throw error
  }
};
