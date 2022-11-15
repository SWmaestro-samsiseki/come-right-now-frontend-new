function calTermTime(time: Date): number {
  // TODO: 개발이 끝나면 10분으로 변경하기!
  const limit = 3;
  const term = new Date().getTime() - new Date(time).getTime();
  return term < limit * 60000 ? term : 0;
}

export { calTermTime };
