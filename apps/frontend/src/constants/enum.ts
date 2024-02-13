enum UserRoleEnum{
    ADMIN="ADMIN",
    ORGANIZER="ORGANIZER",
    USER="USER",
    VISITORS="VISITORS"
}

enum EmailVerificationEnum{
    NewRegister = "newregister", 
    ForgetPassword = "forgetpassword"
}

export {UserRoleEnum, EmailVerificationEnum};