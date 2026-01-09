export function isCurfewTime(): boolean {
  const now = new Date();
  const hour = now.getHours();
  // Curfew: 20:00 (8 PM) to 06:00 (6 AM)
  return hour >= 20 || hour < 6;
}

export function getCurfewMessage(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 20) {
    return 'もう おやすみの じかんだよ！\nまた あした おはなし しようね 🌙';
  } else {
    return 'まだ あさ はやいよ！\nもうすこし ねていてね ☀️';
  }
}
