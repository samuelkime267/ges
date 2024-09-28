export function splitQuestions(
  data: {
    question: string;
    options: string[];
    answer: string;
  }[],
  chunkSize: number
) {
  const result = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
}
