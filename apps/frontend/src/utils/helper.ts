const showError = (error: any) => {
  return error.networkError?.result?.errors[0]?.message;
};

const firstCharacterOfFullName = (fullName: string) => {
  if (!fullName) return null;
  const firstCharacter = fullName.split(" ").map((name) => name.charAt(0));
  return firstCharacter.join("");
};

export const calculateRemainingDates = (upcomingDate: Date) => {
  const now = new Date();
  if (now > upcomingDate) {
    return {
      days: 0,
      minutes: 0,
      hours: 0,
      seconds: 0,
    };
  }
  const timeDifference = upcomingDate.getTime() - now.getTime();

  // Convert milliseconds to days, hours, and minutes
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export { firstCharacterOfFullName, showError };
