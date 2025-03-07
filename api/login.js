import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(request, response) {
  // Avoiding DB for now, so using mockdata.
  const mockUser = {
    email: "test@gmail.com",
    name: "Test User",
    password: await hash("Test@123", 10),
  };
  if (request.method !== "POST") {
    return response.status(405).json({
      message: "Method not allowed",
    });
  }
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(412).json({
        message: "Email and password are required",
      });
    }
    if (email !== mockUser.email) {
      return response.status(400).json({
        message: "Invalid email or password.",
      });
    }
    const isSame = await compare(password, mockUser.password);
    if (!isSame) {
      return response.status(400).json({
        message: "Invalid email or password.",
      });
    }
    const accessToken = jwt.sign(
      { email: mockUser.email, name: mockUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return response.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error.",
    });
  }
}
