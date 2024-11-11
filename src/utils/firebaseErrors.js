export const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/user-not-found":
      return "No user found with this email address.";
    case "auth/wrong-password":
      return "Invalid password.";
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case ("auth/email-already-in-use", "auth/email-already-exists"):
      return "This email is already associated with an account.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled. Contact support.";
    case "auth/weak-password":
      return "The password is too weak. Please choose a stronger password.";
    case "auth/invalid-password":
      return "Invalid password. Please ensure it meets the requirements.";
    case "auth/too-many-requests":
      return "Too many failed login attempts. Please try again later.";
    case "auth/invalid-credential":
      return "The provided authentication credential is invalid.";
    case "auth/invalid-verification-code":
      return "Invalid verification code. Please check and try again.";
    case "auth/invalid-verification-id":
      return "Invalid verification ID. Please retry the verification process.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email but different sign-in credentials.";
    case "auth/requires-recent-login":
      return "Please log in again to perform this action.";
    case "auth/credential-already-in-use":
      return "This credential is already associated with another account.";
    case "auth/invalid-phone-number":
      return "Invalid phone number. Please enter a valid phone number.";
    case "auth/missing-phone-number":
      return "Phone number is required but was not provided.";
    case "auth/provider-already-linked":
      return "This account is already linked with this provider.";
    case "auth/no-such-provider":
      return "The specified provider is not supported by this user account.";
    case "auth/unverified-email":
      return "Please verify your email address to proceed.";
    case "auth/network-request-failed":
      return "Network error occurred. Please check your connection.";
    case "auth/internal-error":
      return "An internal error occurred. Please try again later.";
    case "auth/popup-closed-by-user":
      return "The sign-in popup was closed before completing the operation.";
    case "auth/popup-blocked":
      return "Popup blocked by the browser. Please allow popups for this site.";
    case "auth/app-deleted":
      return "This instance of the app has been deleted.";
    case "auth/expired-action-code":
      return "This action code has expired. Please retry.";
    case "auth/invalid-action-code":
      return "Invalid action code. Please check and try again.";
    case "auth/invalid-api-key":
      return "Invalid API key provided. Please check your configuration.";
    case "auth/invalid-user-token":
      return "User token is invalid. Please reauthenticate.";
    case "auth/network-request-failed":
      return "A network error occurred. Please check your connection.";
    case "auth/quota-exceeded":
      return "Quota for this operation has been exceeded. Try again later.";
    case "auth/app-not-authorized":
      return "This app is not authorized to use Firebase Authentication.";
    case "auth/operation-not-supported-in-this-environment":
      return "This operation is not supported in the current environment.";
    case "auth/timeout":
      return "The operation timed out. Please try again.";
    case "auth/user-token-expired":
      return "Your login session has expired. Please log in again.";
    case "auth/web-storage-unsupported":
      return "Web storage is unsupported in this browser. Please enable cookies.";
    case "auth/invalid-tenant-id":
      return "Invalid tenant ID provided.";
    case "auth/multi-factor-auth-required":
      return "Multi-factor authentication is required to proceed.";
    case "auth/unauthorized-domain":
      return "Unauthorized domain. Contact your administrator.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
