interface CopyToClipboard {
  text: string;
  name?: string;
}

export const copyToClipboard = async (
  { text, name = 'Item' }: CopyToClipboard
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    console.log(`${name} copied to clipboard:`, text);
  } catch (err) {
    console.error(`Failed to copy ${name}:`, err);
  }
};
