import bcrypt from "bcrypt";
import client from "../../client";
// resolver
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // DB에 유저이름과 이메일이 있는지 유효성검사
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("이미 사용중인 계정정보입니다.");
        }
        // 패스워드 해싱
        const uglyPassword = await bcrypt.hash(password, 10);
        // 저장, 리턴
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
