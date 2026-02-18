login: async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findUser({ username });
    if (!user) {
      return res.status(400).json({
        status: false,
        error: {
          message: `Could not find any user with username: \`${username}\`.`,
        },
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {