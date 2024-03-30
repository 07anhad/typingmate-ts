const string = 'As the sun dipped below the horizon, casting hues of pink and orange across the sky, the city streets came alive with the hustle and bustle of evening commuters. People hurriedly made their way home, eager to escape the confines of the office and unwind in the comfort of their own space. Meanwhile, street vendors set up their stalls, filling the air with tantalizing aromas of sizzling meats and exotic spices. The sound of laughter and chatter echoed through the narrow alleyways as friends reunited after a long day apart. Somewhere in the distance, a lone musician serenaded passersby with the melancholic melody of a violin, adding to the enchanting ambiance of the twilight hour. Amidst the chaos and cacophony of urban life, there was a sense of magic in the air, as if anything were possible under the cloak of night.';

export function generateErrorParagraph() {
  const words = string.split(' ');
  const paragraph = [];

  for (let i = 0; i < 150; i++){
    paragraph.push(words[Math.floor(Math.random() * words.length)]);
  }

  return paragraph.join(' ').toLowerCase();
}

export async function generateParagraph() {
  try {
    const response = await fetch('http://metaphorpsum.com/paragraphs/10');

    if (!response.ok)
      throw new Error();
    
    const data = await response.text();

    const paragraph = data.split('\n').join('');

    return paragraph;
  } catch (e) {
    console.log(e);
    const paragraph = generateErrorParagraph();
    return paragraph;
  }
}
