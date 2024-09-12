 
 
 // Create buttons for each animal
 String[] animals = {"brown bear", "cat", "dog", "elepahnt", "hippo", "hyena" ,"lion", "parrot", "wolf", "zebfra"};
 String[] soundFiles = {"brown bear.wav", "cat.wav", "dog.wav", "elephant.wav", "hippo.wav", "hyena.wav", "lion", "parrot", "wolf", "zebra"};
 
 function playSound(soundFile) {
    // Create a new Audio object
    const audio = new Audio(`sounds/${soundFile}.mp3`);
    audio.play(); // Play the sound