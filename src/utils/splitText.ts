const splitText = (text: string): [string, string] => {
  const lines = text.split(/\r?\n/);
  const firstLine = lines[0];
  const rest = lines.slice(1).join("\n");
  return [firstLine, rest];
};

export default splitText;
