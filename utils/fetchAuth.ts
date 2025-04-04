export const fetchLogin = async(loginId: string, password: string) =>{
    return await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ loginId, password }),
    })
}

export const fetchSignup = async (data: {
    name: string;
    loginId: string;
    password: string;
    email: string;
    emailAuthCode: string;
}) => {
    return await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
}

export const fetchEmailAuth = async(email: string) => {
    return await fetch("/api/signup/email-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });
}

export const fetchEmailVerify = async(email: string, emailAuthCode: string) => {
    return await fetch("/api/signup/email-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          authCode: emailAuthCode,
        }),
      });
}