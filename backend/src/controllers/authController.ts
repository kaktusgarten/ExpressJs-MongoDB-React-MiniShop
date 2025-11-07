import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "#models";

// ZOD inferred ########################
type RegisterDTO = z.infer<typeof authRegisterSchema>;
type LoginDTO = z.infer<typeof authLoginSchema>;

/* ENV HELPERS */
const ACCESS_TTL_SEC = Number(process.env.ACCESS_TOKEN_TTL ?? 900);
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_ISSUER = process.env.JWT_ISSUER ?? "Raumbasis";

// SignAccessToken
const signAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: `${ACCESS_TTL_SEC}s`,
    issuer: JWT_ISSUER,
  });

// REGISTRIEREN ########################
export const register: RequestHandler = async (req, res) => {
  // Keine Ahnung wie das im Sample läuft (Siehe: Lektion 10_Authentication_Autorization)
  const {
    firstName,
    lastName,
    email,
    street,
    houseNumber,
    postalCode,
    city,
    phone,
    password,
  } = req.body;

  const userExist = await User.exists({ email });

  if (userExist) {
    throw new Error("Registration failed", { cause: { status: 400 } });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    street,
    houseNumber,
    postalCode,
    city,
    phone,
    password: hash,
  });

  const token = signAccessToken({
    jti: user._id.toString(),
    roles: user.roles,
  });

  //   res
  //     .status(201)
  //     .json({ message: 'registered successfully', user: user, token: token });

  // email verifizierung
  res
    .cookie("accessToken", token, {
      httpOnly: true,
      maxAge: Number(process.env.ACCESS_TOKEN_TTL) * 1000,
      sameSite: "lax", // Für Entwicklung, sonst "none"
      // secure: true  // Für Production
    })
    .status(201)
    .json({
      mesage: "registered successfully",
      user: user,
      token,
    });
};

// LOGIN ###############################
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials", { cause: { status: 400 } });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials", { cause: { status: 400 } });
  }

  const token = signAccessToken({
    jti: user._id.toString(),
    roles: user.roles,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();

  res
    .cookie("accessToken", token, {
      httpOnly: true,
      maxAge: ACCESS_TTL_SEC * 1000,
      sameSite: "lax", // nur für entwicklung, sonst "none"
      // secure: true, // Production
    })
    .status(201)
    .json({
      message: "Logged in",
      // user: userWithoutPassword,  // KEINE USER DATEN MITSCHICKEN BEI LOGIN!
      // token,  // Macht man nicht. Warum auch.. (War nur für uns zur ansicht)
    });
};

// LOGOUT ##############################
export const logout: RequestHandler = async (req, res) => {
  res.clearCookie("accessToken").json({ message: "successfully logged out" });
};

// ME ##################################
// prettier-ignore
export const me: RequestHandler<unknown, { user: any }> =
  async (req, res) => {
  const id = req.user?.id;

  const user = await User.findById(id)

  if(!user) {
    throw new Error('User not found', {cause: {status: 404}})
  }
 
  res.json({user})
};
