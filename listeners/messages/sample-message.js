const sampleMessageCallback = async ({ context, say }) => {
    try {
      console.log('Receive hello message');
      return;
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = { sampleMessageCallback };